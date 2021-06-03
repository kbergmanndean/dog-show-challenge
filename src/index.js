document.addEventListener('DOMContentLoaded', () => {
    let dogs
   fetch("http://localhost:3000/dogs")
    .then(resp=>resp.json())
    .then(data=> dogs=data)
    .then(data=>data.forEach(renderDog))
    


    function renderDog(dog) {
        const row=document.createElement("tr")
        const name=document.createElement("td")
        const breed=document.createElement("td")
        const sex=document.createElement("td")
        const edit=document.createElement("td")
        const editButton=document.createElement("button")
        const tableBody=document.querySelector("#table-body")
        const formName=document.getElementById("name")
        const formBreed=document.getElementById("breed")
        const formSex=document.getElementById("sex")

        name.textContent=dog.name
        breed.textContent=dog.breed
        sex.textContent=dog.sex
        editButton.textContent="edit"

        row.append(name,breed,sex,edit)
        edit.appendChild(editButton)
        tableBody.appendChild(row)

        editButton.addEventListener('click', ()=>{

            formName.value=dog.name
            formBreed.value=dog.breed
            formSex.value=dog.sex
    
        })
        
    }
    function patchAnimal(dogObj,dog){fetch (`http://localhost:3000/dogs/${dogObj.id}`,{
        method: "PATCH",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(dog)
    })
}

    document.querySelector("#dog-form").addEventListener("submit", (e)=> {
        e.preventDefault()
        const dogObj= dogs.find((element)=>{
            if (element.name===e.target.name.value)
            {return element}
        })
        let dog= {
            name:e.target.name.value,
            breed:e.target.breed.value,
            sex:e.target.sex.value
        }
            
        console.log(dogObj)
        patchAnimal(dogObj,dog);
        
    })



























})