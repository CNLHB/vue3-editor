
export const forEach = (options, fn)=>{
    Object.entries(options).forEach(item=>{
        fn&&fn(item[0],item[1])
    })
}