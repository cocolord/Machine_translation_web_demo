$(document).ready(function() {
   MockTask.start();
});

MockTask ={
    startId: "start_mock",
    start: function(){
        $('#'+this.startId).click(function (){
　　　　　　　　...var data = $('#data').val();

            var form_data = JSON.stringify({
              ..."data": data
            });
            MockSubmit.createTask(form_data);

        });
    },
};

MockSubmit = {
    createTask: function(data){
        var url = "/";
        $.post(url,data,function(result){
           if (result.code != 'SUCC'){
               alert("failed to create a new api.")
           } else {
               alert("succ");
           }
        });
    }
};

function isEmptyString(info) {
    if (info == null || info == undefined || info.length == 0){
        return true;
    }
    return false
}