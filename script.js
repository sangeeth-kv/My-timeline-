document.addEventListener("DOMContentLoaded",()=>{
    const timeLine=document.getElementById("timeline");
    const modal=document.getElementById("modal");

    fetch("./events.json")
    .then((res)=>res.json())
    .then((result)=>{
        console.log(result)
        result.forEach((event,index) => {
            const article=document.createElement("article");
            article.classList.add("timeline-event");
            article.innerHTML=`
            <h2>${event.title}</h2>
            <time datetime="${event.year}">${formatDate(event.year)}</time>
            <p>${event.description.substring(0,40)}...</p>
            <button data-index="${index}">Read more..</button>
            `;
            timeLine.appendChild(article);
        });
        
        document.querySelectorAll(".timeline-event button").forEach((btn)=>{
            btn.addEventListener("click",(e)=>{
                const x=e.target.getAttribute("data-index");
                openModal(result[x]);
            })
        })
    })
    .catch((err)=>{
        console.log("error comming from the fetch : ",err)
    })


    function openModal(event){
        modal.innerHTML = `
      <div class="modal-content">
        <span id="close-modal">&times;</span>
        <h2>${event.title}</h2>
        <time>${formatDate(event.year)}</time>
        <img style="width:100px;height:50px;" src="${event.imageURL}" alt="${event.title}" />
        <p>${event.description}</p>
      </div>
    `;
    modal.style.display = "block";
    document.getElementById("close-modal").addEventListener("click", closeModal);

    }

    function closeModal() {
        modal.style.display = "none";
    }

    function formatDate(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  }
   modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  const toggleBtn=document.getElementById("toggle-btn");
  toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
})