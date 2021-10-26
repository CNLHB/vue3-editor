import { reactive ,toRefs,onMounted} from "vue";


export function useMouseMove(ele,options){
    onMounted(() => {
        console.log(ele);
        ele&&ele.addEventListener('mousedown',mouseDownHandle)
    }),
    function mouseDownHandle(event){
        console.log(88);
        ele&&ele.addEventListener('mousemove',mouseMoveHandle)
        ele&&ele.addEventListener('mouseup',mouseUpHandle)
    }
    function mouseMoveHandle(event){
        console.log(11);
    }
    function mouseUpHandle(event){
        ele&&ele.removeEventListener('mousemove',mouseDownHandle)
        ele&&ele.removeEventListener('mousedown',mouseDownHandle)
    }
    const state = reactive({

    })
    return {
        ...toRefs(state)
    }

}