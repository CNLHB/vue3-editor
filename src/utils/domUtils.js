
export const selectDomById = (id)=>{
    const oDiv = document.querySelector(`div[data-id=${id}]`)
    return oDiv
}