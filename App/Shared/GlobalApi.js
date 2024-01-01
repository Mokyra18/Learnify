import { create } from "apisauce";

const api = create({
    //  baseURL: 'http://192.168.0.113:1337/api',
    baseURL:'https://credible-broccoli-0a7d8b104f.strapiapp.com/api',
    headers: { 
        "X-API-Key":"1c0b3ef782e9f39a3d7cbfe0398d949ee5f2094ed895f19f868c92d7aefd11794e093d441f4def2df0135c30168822887261ab1f1343ef4c6f3c9e15a56db85b20ac620297f81ad8f2e6096ac6325be26bcf00b14230b86f3748fcf1e51ae64c59853b86ad4b8f96bf0af53728c5fd9813be72795dd3108c621588b5fea0f928"
      },
  })

const getSlider=()=>api.get('/sliders?populate=*');
const getVideoCourse=()=>api.get('/video-courses?populate=*');
const getCourseList=(type)=>
api.get('course-lists?filters[type][$eq]='
+type+'&populate[Topic][populate][0]=Content&populate[image][populate][0]=image');

const setCourseProgress=(data)=>api.post('/course-progresses',data);

const getCourseProgress=(uid,courseId)=>
api.get('/course-progresses?filters[uid][$eq]='
+uid+'&filters[courseId][$eq]='+courseId)
export default{
    getSlider,
    getVideoCourse,
    getCourseList, 
    setCourseProgress,
    getCourseProgress
}