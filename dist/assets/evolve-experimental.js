(()=>{
 const names=['ORBIT LAMP','VIOLET FORM','MORROW CHAIR','ERA CLOCK'];
 const types=['THE LIGHT SERIES','THE FORM SERIES','THE SPACE SERIES','THE TIME SERIES'];
 const descriptions=['The room changes when the light does.','Shape is only the beginning.','A new place to become yourself.','Time moves differently here.'];
 const stage=document.getElementById('stageWorld');
 const buttons=[...document.querySelectorAll('.artifact')];
 if(!stage||!buttons.length)return;
 let selected=0;
 function select(index){selected=(index+buttons.length)%buttons.length;
  buttons.forEach((b,i)=>{const delta=(i-selected+buttons.length)%buttons.length;b.classList.toggle('active',i===selected);b.dataset.position=delta===0?'center':delta===1?'right':delta===3?'left':'back';b.setAttribute('aria-pressed',String(i===selected))});
  document.getElementById('stageNum').textContent=String(selected+1).padStart(2,'0');
  document.getElementById('stageType').textContent=types[selected];
  document.getElementById('stageName').textContent=names[selected];
  document.getElementById('stageDescription').textContent=descriptions[selected];
  stage.style.setProperty('--stage-tone',['#d0dc9e','#b49ed6','#b6c7ad','#c6a282'][selected]);
 }
 buttons.forEach((b,i)=>b.addEventListener('click',()=>{if(selected===i)inspect();else select(i)}));
 document.getElementById('stagePrev').addEventListener('click',()=>select(selected-1));
 document.getElementById('stageNext').addEventListener('click',()=>select(selected+1));
 document.getElementById('stageInspect').addEventListener('click',inspect);
 function inspect(){const cards=[...document.querySelectorAll('.product')];const item=cards.find(c=>c.querySelector('h3')?.textContent.toUpperCase()===names[selected]);if(item){item.querySelector('.product-art').click()}else{const filter=document.querySelector('[data-category="all"]');if(filter)filter.click();requestAnimationFrame(inspect)}}
 document.addEventListener('keydown',e=>{if(!stage.closest('body'))return;const current=document.activeElement;if(current?.closest('.stage-world,.stage-buttons')){if(e.key==='ArrowRight'){e.preventDefault();select(selected+1)}if(e.key==='ArrowLeft'){e.preventDefault();select(selected-1)}}});
 select(0);
})();
