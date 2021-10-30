const body = document.body
export const isParentEle = (target,key,value) =>{
    if(!target)return false
    let p = target 
    while(p){
        if(p.getAttribute(key) === value){
            return true
        }
        p = p.parentElement
        if(p === body)return false
    }
    return false
}