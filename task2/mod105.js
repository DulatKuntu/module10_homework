const btn = document.querySelector("btn")
btn.addEventListener("click", function() {
    const res = `Width-${window.innerWidth}, Height-${window.innerHeight}`
    alert(res)
})