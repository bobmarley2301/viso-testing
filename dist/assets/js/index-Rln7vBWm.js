import{j as e,b as r,d as t,e as a,u as i,f as n,L as s,B as l,I as o,g as c,V as d,H as h,h as p,T as u,i as g,k as m,l as f,r as b,m as y,n as v,o as w,p as R,q as x,G as C,S as M,s as I,C as A,t as S,v as $,w as _,D as z,x as j,F as W,O as P,Q as L,y as q,z as k,A as B,E as D,J as E,K as F}from"./vendor-C_qY9bjc.js";import{h as O,E as T,c as K,S as Y,C as N,b as H,d as X}from"./ui-uEgtnsGL.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)})).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();var G,J=function(r,t,a){return O.call(t,"css")?e.jsx(T,K(r,t),a):e.jsx(r,t,a)},Q=function(r,t,a){return O.call(t,"css")?e.jsxs(T,K(r,t),a):e.jsxs(r,t,a)},U=r;G=U.createRoot,U.hydrateRoot;const V="https://www.themealdb.com/api/json/v1/1",Z={searchRecipes:async e=>(await t.get(`${V}/search.php?s=${e}`)).data,getRecipeById:async e=>(await t.get(`${V}/lookup.php?i=${e}`)).data,getRecipesByCategory:async e=>(await t.get(`${V}/filter.php?c=${e}`)).data,getAllCategories:async()=>(await t.get(`${V}/categories.php`)).data,getRandomMeal:async()=>(await t.get(`${V}/random.php`)).data,getRecipesByArea:async e=>(await t.get(`${V}/filter.php?a=${e}`)).data,getRecipesByIngredient:async e=>(await t.get(`${V}/filter.php?i=${e}`)).data,getAllAreas:async()=>(await t.get(`${V}/list.php?a=list`)).data,getAllIngredients:async()=>(await t.get(`${V}/list.php?i=list`)).data,getSmallImageUrl:e=>e.replace("/images/media/meals/","/images/media/meals/preview/")},ee=a()(((e,r)=>({selectedRecipes:[],addRecipe:r=>e((e=>({selectedRecipes:[...e.selectedRecipes,r]}))),removeRecipe:r=>e((e=>({selectedRecipes:e.selectedRecipes.filter((e=>e.idMeal!==r.idMeal))}))),getIngredients:()=>{const{selectedRecipes:e}=r(),t=new Map;return e.forEach((e=>{Object.entries(e).filter((([e,r])=>e.startsWith("strIngredient")&&r)).forEach((([r,a])=>{const i=`strMeasure${r.slice(13)}`,n=e[i];t.set(a,n)}))})),Array.from(t.entries()).map((([e,r])=>({name:e,measure:r})))}}))),re=({recipe:e,onSelect:r})=>{const{addRecipe:t,selectedRecipes:a,removeRecipe:b}=ee(),y=i(),v=n("white","gray.800"),w=n("gray.200","gray.700"),R=n("gray.600","gray.400"),x=a.some((r=>r.idMeal===e.idMeal)),C=`/recipe/${e.idMeal}`;return Q(l,{bg:v,borderWidth:"1px",borderColor:w,borderRadius:"lg",overflow:"hidden",transition:"all 0.3s",_hover:{transform:"translateY(-4px)",shadow:"lg"},position:"relative",children:[J(c,{as:s,to:C,fontSize:"1.25rem",fontWeight:"bold",cursor:"pointer",textDecoration:"none",color:n("gray.800","white"),_hover:{color:"blue.500"},children:J(l,{position:"relative",paddingTop:"75%",children:J(o,{src:e.strMealThumb,alt:e.strMeal,position:"absolute",top:"0",left:"0",width:"100%",height:"100%",objectFit:"cover",cursor:"pointer",transition:"transform 0.3s",_hover:{transform:"scale(1.05)"}})})}),Q(d,{p:4,align:"start",spacing:3,children:[J(c,{as:s,to:C,fontSize:"1.25rem",fontWeight:"bold",cursor:"pointer",textDecoration:"none",color:n("gray.800","white"),_hover:{color:"blue.500"},children:e.strMeal}),Q(h,{spacing:2,flexWrap:"wrap",children:[J(p,{colorScheme:"blue",borderRadius:"full",px:3,py:1,children:e.strCategory}),J(p,{colorScheme:"green",borderRadius:"full",px:3,py:1,children:e.strArea})]}),J(u,{color:R,fontSize:"sm",noOfLines:2,children:e.strInstructions}),J(f,{label:x?"Видалити з вибраних":"Додати до вибраних",placement:"top",children:J(g,{colorScheme:x?"red":"blue",onClick:()=>{r?r(e):x?(b(e),y({title:"Рецепт видалено",description:`${e.strMeal} видалено з вибраних рецептів`,status:"info",duration:3e3,isClosable:!0})):(t(e),y({title:"Рецепт додано",description:`${e.strMeal} додано до вибраних рецептів`,status:"success",duration:3e3,isClosable:!0}))},width:"100%",leftIcon:J(m,{as:Y}),variant:x?"solid":"outline",transition:"all 0.2s",_hover:{transform:"translateY(-1px)",shadow:"md"},children:x?"Вибрано":"Вибрати"})})]})]})};const te=({currentPage:e,totalPages:r,onPageChange:t})=>{const a=n("white","gray.800"),i=n("gray.200","gray.700"),s=n("blue.500","blue.300"),o=n("gray.600","gray.400");return Q(h,{spacing:2,justify:"center",mt:8,mb:4,children:[J(g,{onClick:()=>t(e-1),isDisabled:1===e,leftIcon:J(N,{}),variant:"outline",colorScheme:"blue",size:"sm",transition:"all 0.2s",_hover:{transform:"translateX(-2px)",shadow:"sm"},_disabled:{opacity:.5,cursor:"not-allowed"},children:"Попередня"}),(()=>{const t=[];if(r<=7)for(let e=1;e<=r;e++)t.push(e);else if(e<=4){for(let e=1;e<=7;e++)t.push(e);t.push("...",r)}else if(e>=r-3){t.push(1,"...");for(let e=r-6;e<=r;e++)t.push(e)}else{t.push(1,"...");for(let r=e-2;r<=e+2;r++)t.push(r);t.push("...",r)}return t})().map(((r,n)=>J(l,{children:"..."===r?J(l,{px:3,py:1,color:o,fontWeight:"medium",children:"..."}):J(g,{onClick:()=>t(r),variant:e===r?"solid":"outline",colorScheme:e===r?"blue":"gray",size:"sm",minW:"40px",h:"40px",p:0,transition:"all 0.2s",_hover:{transform:"translateY(-2px)",shadow:"sm"},_active:{transform:"translateY(0)"},bg:e===r?s:a,color:e===r?"white":o,borderColor:e===r?s:i,children:r})},n))),J(g,{onClick:()=>t(e+1),isDisabled:e===r,rightIcon:J(H,{}),variant:"outline",colorScheme:"blue",size:"sm",transition:"all 0.2s",_hover:{transform:"translateX(2px)",shadow:"sm"},_disabled:{opacity:.5,cursor:"not-allowed"},children:"Наступна"})]})},ae=new L,ie=q({component:()=>{const e=j(),r=n("blue.500","blue.600"),t=n("white","white"),a=n("whiteAlpha.800","whiteAlpha.800");return Q(l,{minH:"100vh",bg:n("gray.50","gray.900"),children:[Q(W,{as:"nav",align:"center",justify:"space-between",wrap:"wrap",padding:"1rem 2rem",bg:r,color:"white",boxShadow:"sm",children:[J(W,{align:"center",mr:5,children:J(c,{as:s,to:"/",fontSize:"1.5rem",fontWeight:"bold",color:"white",textDecoration:"none",transition:"opacity 0.2s",_hover:{opacity:.8},children:"Рецепти"})}),Q(W,{gap:4,children:[J(c,{as:s,to:"/",color:"/"===e.state.location.pathname?t:a,textDecoration:"none",padding:"0.5rem 1rem",borderRadius:"md",transition:"all 0.2s",_hover:{bg:"whiteAlpha.200"},children:"Всі рецепти"}),J(c,{as:s,to:"/selected",color:"/selected"===e.state.location.pathname?t:a,textDecoration:"none",padding:"0.5rem 1rem",borderRadius:"md",transition:"all 0.2s",_hover:{bg:"whiteAlpha.200"},children:"Вибрані рецепти"})]})]}),J(l,{as:"main",py:8,children:J(P,{})})]})}}),ne=k({getParentRoute:()=>ie,path:"/",component:()=>{var e,r;const[t,a]=b.useState(""),[i,s]=b.useState(""),[o,c]=b.useState(""),[h,p]=b.useState(1),g=function(e,r){const[t,a]=b.useState(e);return b.useEffect((()=>{const t=setTimeout((()=>{a(e)}),r);return()=>{clearTimeout(t)}}),[e,r]),t}(t,500),m=n("white","gray.800"),f=n("gray.200","gray.700"),{data:S,isLoading:$}=y({queryKey:["areas"],queryFn:Z.getAllAreas}),{data:_,isLoading:z}=y({queryKey:["ingredients"],queryFn:Z.getAllIngredients}),{data:j,isLoading:W}=y({queryKey:["recipes",g,i,o],queryFn:async()=>{if(g)return Z.searchRecipes(g);if(i)return Z.getRecipesByArea(i);if(o)return Z.getRecipesByIngredient(o);return{meals:(await Promise.all(Array(14).fill(null).map((()=>Z.getRandomMeal())))).flatMap((e=>e.meals||[]))}}}),P=b.useMemo((()=>(null==j?void 0:j.meals)||[]),[j]),L=Math.ceil(P.length/12),q=b.useMemo((()=>P.slice(12*(h-1),12*h)),[P,h]);return J(A,{maxW:"container.xl",py:8,children:Q(d,{spacing:8,align:"stretch",children:[J(v,{textAlign:"center",size:"xl",mb:8,children:"Рецепти"}),J(l,{width:"100%",children:Q(w,{size:"lg",children:[J(R,{pointerEvents:"none",children:J(X,{color:"gray.400"})}),J(x,{placeholder:"Пошук рецептів...",value:t,onChange:e=>{a(e.target.value),s(""),c(""),p(1)},bg:m,borderColor:f,_hover:{borderColor:"blue.500"},_focus:{borderColor:"blue.500"}})]})}),Q(C,{templateColumns:"repeat(2, 1fr)",gap:4,width:"100%",children:[J(M,{isLoaded:!$,children:J(I,{placeholder:"Виберіть кухню",value:i,onChange:e=>{s(e.target.value),a(""),c(""),p(1)},bg:m,borderColor:f,_hover:{borderColor:"blue.500"},_focus:{borderColor:"blue.500"},children:null==(e=null==S?void 0:S.meals)?void 0:e.map((e=>J("option",{value:e.strArea,children:e.strArea},e.strArea)))})}),J(M,{isLoaded:!z,children:J(I,{placeholder:"Виберіть інгредієнт",value:o,onChange:e=>{c(e.target.value),a(""),s(""),p(1)},bg:m,borderColor:f,_hover:{borderColor:"blue.500"},_focus:{borderColor:"blue.500"},children:null==(r=null==_?void 0:_.meals)?void 0:r.map((e=>J("option",{value:e.strIngredient,children:e.strIngredient},e.strIngredient)))})})]}),W?J(C,{templateColumns:{base:"1fr",md:"repeat(2, 1fr)",lg:"repeat(3, 1fr)"},gap:6,width:"100%",children:Array(6).fill(null).map(((e,r)=>J(M,{height:"300px",borderRadius:"lg"},r)))}):0===P.length?J(u,{textAlign:"center",fontSize:"lg",color:"gray.500",children:"Рецептів не знайдено"}):J(C,{templateColumns:{base:"1fr",md:"repeat(2, 1fr)",lg:"repeat(3, 1fr)"},gap:6,width:"100%",children:q.map((e=>J(re,{recipe:e},e.idMeal)))}),L>1&&J(te,{currentPage:h,totalPages:L,onPageChange:p})]})})}}),se=k({getParentRoute:()=>ie,path:"/recipe/$recipeId",component:()=>{var e;const{recipeId:r}=S({from:"/recipe/$recipeId"}),{addRecipe:t,removeRecipe:a,selectedRecipes:n}=ee(),s=i(),{data:c}=y({queryKey:["recipe",r],queryFn:()=>Z.getRecipeById(r)}),h=null==(e=null==c?void 0:c.meals)?void 0:e[0],p=n.some((e=>e.idMeal===(null==h?void 0:h.idMeal)));if(!h)return J(A,{maxW:"container.xl",py:8,children:J(v,{children:"Рецепт не знайдено"})});const g=Object.entries(h).filter((([e,r])=>e.startsWith("strIngredient")&&r)).map((([e,r])=>{const t=`strMeasure${e.slice(13)}`;return{ingredient:r,measure:h[t]}}));return J(A,{maxW:"container.xl",py:8,children:Q(d,{spacing:8,align:"stretch",children:[Q(C,{templateColumns:{base:"1fr",md:"1fr 1fr"},gap:8,children:[J(l,{children:J(o,{src:h.strMealThumb,alt:h.strMeal,borderRadius:"lg",width:"100%",objectFit:"cover"})}),Q(d,{align:"start",spacing:4,children:[J(v,{children:h.strMeal}),Q(u,{color:"gray.600",children:["Категорія: ",h.strCategory]}),Q(u,{color:"gray.600",children:["Кухня: ",h.strArea]}),Q(u,{color:"gray.600",children:["Інструкції: ",h.strInstructions]}),J(l,{as:"button",onClick:()=>{p?(a(h),s({title:"Рецепт видалено",description:`${h.strMeal} видалено з вибраних рецептів`,status:"info",duration:3e3,isClosable:!0})):(t(h),s({title:"Рецепт додано",description:`${h.strMeal} додано до вибраних рецептів`,status:"success",duration:3e3,isClosable:!0}))},px:4,py:2,bg:p?"red.500":"blue.500",color:"white",borderRadius:"md",_hover:{bg:p?"red.600":"blue.600"},children:p?"Видалити з вибраних":"Додати до вибраних"})]})]}),Q(l,{children:[J(v,{size:"md",mb:4,children:"Інгредієнти"}),J($,{spacing:2,children:g.map(((e,r)=>Q(_,{children:[e.measure," ",e.ingredient]},r)))})]})]})})}}),le=k({getParentRoute:()=>ie,path:"/selected",component:()=>{const{selectedRecipes:e,removeRecipe:r,getIngredients:t}=ee(),a=i(),n=e=>{r(e),a({title:"Рецепт видалено",description:`${e.strMeal} видалено з вибраних рецептів`,status:"info",duration:3e3,isClosable:!0})};return 0===e.length?J(A,{maxW:"container.xl",py:8,children:Q(d,{spacing:4,children:[J(v,{children:"Мої вибрані рецепти"}),J(u,{children:"У вас поки немає вибраних рецептів"})]})}):J(A,{maxW:"container.xl",py:8,children:Q(d,{spacing:8,align:"stretch",children:[J(v,{children:"Мої вибрані рецепти"}),J(C,{templateColumns:{base:"1fr",md:"repeat(2, 1fr)",lg:"repeat(3, 1fr)",xl:"repeat(4, 1fr)"},gap:6,children:e.map((e=>J(re,{recipe:e,onSelect:n},e.idMeal)))}),J(z,{}),Q(l,{children:[J(v,{size:"md",mb:4,children:"Список інгредієнтів:"}),J($,{spacing:2,children:t().map((e=>Q(_,{children:["• ",e.name," - ",e.measure]},e.name)))})]}),J(z,{}),Q(l,{children:[J(v,{size:"md",mb:4,children:"Інструкції по приготуванню:"}),e.map((e=>Q(l,{mb:6,children:[J(v,{size:"sm",mb:2,children:e.strMeal}),J(u,{whiteSpace:"pre-line",children:e.strInstructions})]},e.idMeal)))]})]})})}}),oe=B({routeTree:ie.addChildren([ne,se,le])});function ce(){return J(F,{client:ae,children:J(D,{children:J(E,{router:oe})})})}G(document.getElementById("root")).render(J(b.StrictMode,{children:J(ce,{})}));
//# sourceMappingURL=index-Rln7vBWm.js.map
