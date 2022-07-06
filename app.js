const input_box = document.getElementById("input_box");
const result = document.getElementById("result");
const API=`https://randomuser.me/api?results=50&name=${name}`;
const listData=[];

const getData= async(name="")=>{
    let resultData=[]
    try {
        const apiData = await fetch(API)
        const res = await apiData.json();
        resultData= res.results;
        return resultData;
        
    } catch (error) {
        console.log(error)
        
    }   
}

const showData =(data)=>{
    result.innerHTML=""
    data.forEach(biodata => {
        const elementLi= document.createElement("li");
        elementLi.innerHTML=`
         <img src="${biodata.picture.large}" alt="${biodata.name.first}">
         <div class="user-info">
                <h4>${biodata.name.first} ${biodata.name.last}</h4>
                <p>${biodata.location.city}, ${biodata.location.country}</p>
        </div>`
         result.appendChild(elementLi); 
         listData.push(elementLi);
    });
}

const filter=(searchItem)=>{
    listData.forEach((item)=>{
        let Text = item.textContent.toLowerCase();
        let search = searchItem.toLowerCase();
        if(Text.includes(search)){
            item.classList.remove('hide');
        }else{
            item.classList.add('hide');
        }
    })

}

const uploadData = async()=>{
    let result = await getData();
    showData(result)

}



input_box.addEventListener('input',(e)=>{
    filter(e.target.value)
})

uploadData()