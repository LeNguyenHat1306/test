
        
        //window.localStorage.clear(); hàm xóa giỏ hàng
        
       $('#contentSearch').keypress(function(e){
           var keycode = (e.keycode ? e.keycode : e.which);
        if(keycode == '32'){
            location.href = 'timkiem.html';
        }
       })
       
        
    
        function search(){
            var inputElement = document.querySelector('#contentSearch');
           
                if (checkData(inputElement.value)) {
                    
                    console.log(Math.random());
                    location.href = 'timkiem.html';
            
                }
            else alert('Sai')
        }
      
        
       
       
        var cartElement = document.querySelector('.icon-cart');
        cartElement.onclick = function () {
            location.href = 'donhang.html';
         }
        
        
        
        
        function checkData(data) {
                //console.log(data.indexOf(' '));
                if (data.length !== 0 && data.indexOf(' ') === -1) {
                    return true;
                }
                for (let index = 0; index < data.length; index++) {
                    if (data[index] != ' ') {
                        return true;
                    }
                }
                return false;
            }
        
    



