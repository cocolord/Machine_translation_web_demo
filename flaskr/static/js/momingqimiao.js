


<script>
var userId = localStorage.getItem('user_id');
if (userId == null) {
    userId = uuidv4();
    localStorage.setItem('user_id', userId);
}

var likedIds = localStorage.getItem('liked_ids');

if (likedIds == null) {
    likedIds = new Set();
    saveLikedIds()
} else {
    likedIds = new Set(JSON.parse(likedIds));
}

function saveLikedIds() {
    localStorage.setItem('liked_ids', JSON.stringify(Array.from(likedIds)))
}


function get(url, cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                data = JSON.parse(xmlhttp.responseText);
                cb(data)
            }
        }
    };
    xmlhttp.open("GET", url);
    xmlhttp.send();
}


function post(url, req, cb) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                data = JSON.parse(xmlhttp.responseText);
                cb(data)
            }
        }
    };
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json")
    xmlhttp.send(JSON.stringify(req));
}

var app = new Vue({
        components: {
            'vue-ads': VueAds
        },
        el: '#app',
        data: {
            in_str: '',
            in_html: '',
            output: '',
            out_html: '',
            couplets: [],
            loading: false,
            uploading: false,
            uploaded: false
        },
        watch: {
            in_str: function (val, oldVal) {
                this.up_couplet(val);
                this.output = "";
                self.uploaded = false;
            }
        },

        mounted: function () {
            // this.get_couplets();
            this.resume();
        },

        methods: {
            get_output: function () {
                self = this;
                self.output = "";
                self.loading = true;
                get("https://ai-backend.binwang.me/chat/couplet/" + self.in_str, function (data) {
                    self.output = data.output;
                    self.out_html = self.str_to_html(data.output);
                    self.loading = false;
                });
                // tracker.send('event', 'Couplet', 'play');

            },
            str_to_html: function (str) {
                var html = '';
                if (!!str) {
                    for (var i = 0; i < str.length; i++) {
                        html += '<span>' + str.charAt(i) + '</span>';
                    }
                }
                return html;
            },
            up_couplet: function (val) {
                this.in_html = this.str_to_html(val);
            },
            upload_couplet: function () {
                self = this;
                var couplet = {
                    userId: userId,
                    up: this.in_str,
                    down: this.output
                };
                self.uploading = true;
                post("http://proxy.binwang.me:8084/couplet", couplet, function (data) {
                    self.uploading = false;
                    self.uploaded = true;
                    likedIds.add(data.id);
                    saveLikedIds();
                    self.get_couplets();
                })
                // tracker.send('event', 'Couplet', 'upload');
            },

            like_couplet: function (couplet_id) {
                self = this;
                if (likedIds.has(couplet_id)) {
                    return
                }
                get("http://proxy.binwang.me:8084/like_couplet?user_id=" + userId +
                    "&couplet_id=" + couplet_id, function (data) {
                    for (var i = 0; i < self.couplets.length; i++) {
                        if (self.couplets[i].id == couplet_id) {
                            self.couplets[i].likedCount = data.likedCount;
                            self.couplets[i].liked = true;
                            likedIds.add(couplet_id);
                            saveLikedIds()
                        }
                    }
                })
                // tracker.send('event', 'Couplet', 'like');
            },

            get_couplets: function () {
                self = this;
                get("http://proxy.binwang.me:8084/couplets", function (data) {
                    self.couplets = [];
                    for (var i = 0; i < data.couplets.length; i++) {
                        if (i == 3) {
                            self.couplets.push({id: 0});
                        }
                        self.couplets.push(data.couplets[i]);
                    }
                    for (var j = 0; j < self.couplets.length; j++) {
                        self.couplets[j].liked = !!likedIds.has(self.couplets[j].id);
                    }
                });
            }
        }
    })
    </script>


