$(document).ready(function() {
    
    //Main 카테고리를 선택 할때 마다 AJAX를 호출할 수 있지만 DB접속을 매번 해야 하기 때문에 main, sub카테고리 전체을 들고온다.
    var mainCategoryArray = new Array();
    var mainCategoryObject = new Object();
    
    mainCategoryObject = new Object();
    mainCategoryObject.main_category_id = "1";
    mainCategoryObject.main_category_name = "날씨";
    mainCategoryArray.push(mainCategoryObject);
    
    mainCategoryObject = new Object();
    mainCategoryObject.main_category_id = "2";
    mainCategoryObject.main_category_name = "사랑";
    mainCategoryArray.push(mainCategoryObject);

    mainCategoryObject = new Object();
    mainCategoryObject.main_category_id = "3";
    mainCategoryObject.main_category_name = "친구";
    mainCategoryArray.push(mainCategoryObject);

    mainCategoryObject = new Object();
    mainCategoryObject.main_category_id = "4";
    mainCategoryObject.main_category_name = "인생";
    mainCategoryArray.push(mainCategoryObject);

    mainCategoryObject = new Object();
    mainCategoryObject.main_category_id = "5";
    mainCategoryObject.main_category_name = "진로";
    mainCategoryArray.push(mainCategoryObject);

    mainCategoryObject = new Object();
    mainCategoryObject.main_category_id = "6";
    mainCategoryObject.main_category_name = "여행";
    mainCategoryArray.push(mainCategoryObject);
    
    //Sub 카테고리 셋팅
    var subCategoryArray = new Array();
    var subCategoryObject = new Object();
    
    //친구 해당하는 sub category 리스트
    subCategoryObject = new Object();
    subCategoryObject.main_category_id = "3";
    subCategoryObject.sub_category_id = "1"
    subCategoryObject.sub_category_name = "친구와 어떤 일로 싸웠나요?"
    subCategoryArray.push(subCategoryObject);
    
    subCategoryObject = new Object();
    subCategoryObject.main_category_id = "3";
    subCategoryObject.sub_category_id = "2"
    subCategoryObject.sub_category_name = "가장 친한 친구 한 명을 떠올려 보세요. 그 친구와 어떻게 친해지게 되었나요?"
    subCategoryArray.push(subCategoryObject);

    subCategoryObject = new Object();
    subCategoryObject.main_category_id = "3";
    subCategoryObject.sub_category_id = "3"
    subCategoryObject.sub_category_name = "친구와 오늘 무엇을 하며 놀았나요?"
    subCategoryArray.push(subCategoryObject);
    
    //인생에 해당하는 sub category 리스트
    subCategoryObject = new Object();
    subCategoryObject.main_category_id = "4";
    subCategoryObject.sub_category_id = "1"
    subCategoryObject.sub_category_name = "1번"
    subCategoryArray.push(subCategoryObject);
    
    subCategoryObject = new Object();
    subCategoryObject.main_category_id = "4";
    subCategoryObject.sub_category_id = "2"
    subCategoryObject.sub_category_name = "2번"
    subCategoryArray.push(subCategoryObject);

    //메인 카테고리 셋팅
    var mainCategorySelectBox = $("select[name='mainCategory']");
    
    for(var i=0;i<mainCategoryArray.length;i++){
        mainCategorySelectBox.append("<option value='"+mainCategoryArray[i].main_category_id+"'>"+mainCategoryArray[i].main_category_name+"</option>");
    }


    //*********** 1depth카테고리 선택 후 2depth 생성 START ***********
    $(document).on("change","select[name='mainCategory']",function(){
        
        //두번째 셀렉트 박스를 삭제 시킨다.
        var subCategorySelectBox = $("select[name='subCategory']");
        subCategorySelectBox.children().remove(); //기존 리스트 삭제
        
        //선택한 첫번째 박스의 값을 가져와 일치하는 값을 두번째 셀렉트 박스에 넣는다.
        $("option:selected", this).each(function(){
            var selectValue = $(this).val(); //main category 에서 선택한 값
            subCategorySelectBox.append("<option value=''>전체</option>");
            for(var i=0;i<subCategoryArray.length;i++){
                if(selectValue == subCategoryArray[i].main_category_id){
                    
                    subCategorySelectBox.append("<option value='"+subCategoryArray[i].sub_category_id+"'>"+subCategoryArray[i].sub_category_name+"</option>");
                    
                }
            }
        });
        
    });
    //*********** 1depth카테고리 선택 후 2depth 생성 END ***********
        
});
