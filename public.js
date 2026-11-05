'use strict';
const descriptions={
'定制服务':{desc:'面向个人创作与工程实践的嵌入式功能开发、原型搭建和问题定位。',items:['需求拆解与技术可行性评估','按约定完成开发、适配与功能验证','交付约定工程、接线说明及使用讲解'],boundary:'材料、结构加工与新增功能单独确认；精度、性能和工期以评估后约定为准。'},
'比赛服务':{desc:'围绕独立实践提供训练支持，帮助你理解方案和调试方法。',items:['往年赛题拆解与方案复盘','传感、显示、通信与控制模块训练','项目演示、设计思路表达与技术问答'],boundary:'遵守赛事规则，仅承接允许的训练与学习支持，不提供违规代赛或受限赛期外援。'},
'保研辅导':{desc:'面向理工科同学，从申请准备到面试表达的一对一经验交流。',items:['背景与目标梳理，制定准备清单','审阅真实申请材料与项目经历','自我介绍演练、模拟问答及反馈'],boundary:'具体院校政策以官方公告为准，不承诺入营或录取，不提供材料造假与代写代交。'},
'简历辅导':{desc:'面向硬件与嵌入式实习求职，把实际经历表达得具体、可信。',items:['目标岗位与现有简历诊断','项目、实习职责及成果梳理','修改意见与约定次数的复查 / 模拟追问'],boundary:'服务基于真实经历，不编造项目、任职或成绩，不承诺面试或录用结果。'}
};
document.querySelector('#year').textContent=new Date().getFullYear();
let active='定制服务';const dialog=document.querySelector('#service-dialog');
document.querySelectorAll('[data-service]').forEach(button=>button.addEventListener('click',()=>{active=button.dataset.service;const d=descriptions[active];document.querySelector('#detail-title').textContent=active;document.querySelector('#detail-desc').textContent=d.desc;const list=document.querySelector('#detail-list');list.replaceChildren(...d.items.map(t=>{const li=document.createElement('li');li.textContent=t;return li;}));document.querySelector('#detail-boundary').textContent=d.boundary;dialog.showModal();}));
document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(d=>d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}}));
document.querySelector('#detail-contact').addEventListener('click',()=>{document.querySelector('[name=service]').value=active;dialog.close();document.querySelector('#contact').scrollIntoView({behavior:'smooth'});});
document.querySelector('#inquiry').addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.target);document.querySelector('#summary-text').value=`【LiZi Studio 咨询】\n服务：${f.get('service')}\n目标与目前进度：${f.get('needs').trim()}\n期望时间：${f.get('deadline')||'待沟通'}\n预算范围：${f.get('budget')||'待沟通'}\n希望先确认：可行性、交付范围与报价。`;document.querySelector('#copy-result').textContent='';document.querySelector('#summary-dialog').showModal();});
document.querySelector('#copy-summary').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.querySelector('#summary-text').value);document.querySelector('#copy-result').textContent=' 已复制';}catch{document.querySelector('#summary-text').select();document.querySelector('#copy-result').textContent=' 请手动复制选中的文字';}});
