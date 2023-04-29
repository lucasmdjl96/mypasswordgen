import{S as qr,i as Or,s as Fr,k as r,a as c,q as n,Q as Ke,K as Wr,l as a,h as s,c as g,m as l,r as d,R as Ie,n as t,M as Jr,G as e,b as Vr,H as tr}from"../chunks/index.a5c23e87.js";/* empty css                    */import{b as v}from"../chunks/paths.f76d1b79.js";function Qr(Ur){let E,L,B,D,S,N,P,j,z,Ee,y,M,C,me,R,Ae,Se,ke,G,Ne,Te,h,H,Le,je,V,ze,Me,U,Re,Ge,q,u,O,He,Ve,F,Ue,qe,W,Oe,Fe,J,We,Je,Q,Qe,Ye,Y,Xe,Ze,X,$e,et,Z,o,$,tt,rt,K,x,ve,at,ee,st,lt,te,ot,nt,I,m,we,dt,re,it,ct,gt,ht,ae,bt,ut,pt,ft,se,yt,xt,le,mt,kt,vt,wt,oe,_t,Et,ne,Bt,Dt,Pt,Ct,de,Kt,It,ie,At,St,Nt,Tt,ce,Lt,jt,ge,zt,Mt,Rt,Gt,he,Ht,Vt,be,Ut,qt,Ot,ue,Ft,Wt,pe,Jt,Qt,T,Yt,w,Xt,Zt,fe,_e,k,ye,$t,_,rr;return{c(){E=r("link"),L=r("link"),B=r("link"),D=r("link"),S=r("link"),N=r("link"),P=r("link"),j=r("meta"),z=r("meta"),Ee=c(),y=r("div"),M=r("nav"),C=r("div"),me=r("div"),R=r("a"),Ae=n("Home"),Se=c(),ke=r("div"),G=r("a"),Ne=n("Privacy Policy"),Te=c(),h=r("div"),H=r("h1"),Le=n("About this app"),je=c(),V=r("p"),ze=n("MyPasswordGen is a webapp for a generating and managing passwords."),Me=c(),U=r("h2"),Re=n("Usage"),Ge=c(),q=r("div"),u=r("div"),O=r("p"),He=n(`MyPasswordGen works by generating unique passwords based on 4 factors: a master username and a master\r
                    password, both of which can be set in the log-in page, and an email and a site name for which\r
                    the password is to be used, both of which can be set in the page after logging-in.`),Ve=c(),F=r("p"),Ue=n(`The password generated is completely determined by these four factors, allowing the user to generate the same\r
                    password across different devices/sessions. Since the password is never stored anywhere, any password will\r
                    allow to proceed to the next page, but the password that will be generated will be different for\r
                    each different master password input.`),qe=c(),W=r("p"),Oe=n(`Once logged in, the user can save/select/delete email addresses for the username they have logged in with\r
                    and, after selecting one of these, they can save/select/delete site names for said email address, all of\r
                    which will remain available for successive log-ins.`),Fe=c(),J=r("p"),We=n("All usernames, email addresses and site names are stored in the indexedDB."),Je=c(),Q=r("p"),Qe=n(`Clicking on the export button while on the log-in page will initiate the download of a file containing all\r
                    the data of the user's session. This data can then be uploaded via\r
                    the Import button on the log-in page, which will allow the user to upload the previously downloaded file.\r
                    Note that importing a session will overwrite any previous data linked to the session.`),Ye=c(),Y=r("p"),Xe=n(`Clicking on the export button while on the email/site page will do the same as in the login page, but just\r
                    with the data of the username currently logged in. Importing this data will not overwrite the data linked\r
                    to the session, but will fail if the username already exists.`),Ze=c(),X=r("h3"),$e=n("Keyboard Shortcuts"),et=c(),Z=r("div"),o=r("p"),$=r("kbd"),tt=n("Ctrl"),rt=n(`\r
                +\r
                `),K=r("kbd"),x=Ke("svg"),ve=Ke("path"),at=c(),ee=r("span"),st=n("Arrow key up"),lt=n(`\r
                /\r
                `),te=r("kbd"),ot=n("Ctrl"),nt=n(`\r
                +\r
                `),I=r("kbd"),m=Ke("svg"),we=Ke("path"),dt=c(),re=r("span"),it=n("Arrow key down"),ct=n(`\r
                : can be used to move up or down among text input fields`),gt=r("br"),ht=c(),ae=r("kbd"),bt=n("Enter"),ut=n(`\r
                : can be used to advance to the next input or click on the next button`),pt=r("br"),ft=c(),se=r("kbd"),yt=n("Alt"),xt=n(`\r
                +\r
                `),le=r("kbd"),mt=n("Enter"),kt=n(`\r
                : on the login page can be used to register a username`),vt=r("br"),wt=c(),oe=r("kbd"),_t=n("Ctrl"),Et=n(`\r
                +\r
                `),ne=r("kbd"),Bt=n("Backspace"),Dt=n(`\r
                : can be used to return to the login page from the email/site page`),Pt=r("br"),Ct=c(),de=r("kbd"),Kt=n("Ctrl"),It=n(`\r
                +\r
                `),ie=r("kbd"),At=n("Del"),St=n(`\r
                : can be used to delete a saved email or site`),Nt=r("br"),Tt=c(),ce=r("kbd"),Lt=n("Ctrl"),jt=n(`\r
                +\r
                `),ge=r("kbd"),zt=n("S"),Mt=n(`\r
                : can be used to toggle password visibility`),Rt=r("br"),Gt=c(),he=r("kbd"),Ht=n("Ctrl"),Vt=n(`\r
                +\r
                `),be=r("kbd"),Ut=n("C"),qt=n(`\r
                : can be used after generating a password to copy it to the clipboard`),Ot=c(),ue=r("h2"),Ft=n("License"),Wt=c(),pe=r("p"),Jt=n("This program is released under the GPLv3 license."),Qt=c(),T=r("p"),Yt=n(`All the source code is free and available at \r
            `),w=r("a"),Xt=n("GitHub"),Zt=c(),fe=r("footer"),_e=r("div"),k=r("form"),ye=r("input"),$t=c(),_=r("input"),this.h()},l(A){const p=Wr("svelte-92zmey",document.head);E=a(p,"LINK",{href:!0,rel:!0}),L=a(p,"LINK",{href:!0,rel:!0}),B=a(p,"LINK",{href:!0,rel:!0,sizes:!0,type:!0}),D=a(p,"LINK",{href:!0,rel:!0,sizes:!0,type:!0}),S=a(p,"LINK",{color:!0,href:!0,rel:!0}),N=a(p,"LINK",{href:!0,rel:!0,sizes:!0}),P=a(p,"LINK",{href:!0,rel:!0,sizes:!0,type:!0}),j=a(p,"META",{content:!0,name:!0}),z=a(p,"META",{content:!0,name:!0}),p.forEach(s),Ee=g(A),y=a(A,"DIV",{class:!0});var xe=l(y);M=a(xe,"NAV",{class:!0});var ar=l(M);C=a(ar,"DIV",{class:!0});var Be=l(C);me=a(Be,"DIV",{});var sr=l(me);R=a(sr,"A",{href:!0});var lr=l(R);Ae=d(lr,"Home"),lr.forEach(s),sr.forEach(s),Se=g(Be),ke=a(Be,"DIV",{});var or=l(ke);G=a(or,"A",{href:!0});var nr=l(G);Ne=d(nr,"Privacy Policy"),nr.forEach(s),or.forEach(s),Be.forEach(s),ar.forEach(s),Te=g(xe),h=a(xe,"DIV",{class:!0});var b=l(h);H=a(b,"H1",{class:!0});var dr=l(H);Le=d(dr,"About this app"),dr.forEach(s),je=g(b),V=a(b,"P",{class:!0});var ir=l(V);ze=d(ir,"MyPasswordGen is a webapp for a generating and managing passwords."),ir.forEach(s),Me=g(b),U=a(b,"H2",{class:!0});var cr=l(U);Re=d(cr,"Usage"),cr.forEach(s),Ge=g(b),q=a(b,"DIV",{class:!0});var gr=l(q);u=a(gr,"DIV",{class:!0});var f=l(u);O=a(f,"P",{class:!0});var hr=l(O);He=d(hr,`MyPasswordGen works by generating unique passwords based on 4 factors: a master username and a master\r
                    password, both of which can be set in the log-in page, and an email and a site name for which\r
                    the password is to be used, both of which can be set in the page after logging-in.`),hr.forEach(s),Ve=g(f),F=a(f,"P",{class:!0});var br=l(F);Ue=d(br,`The password generated is completely determined by these four factors, allowing the user to generate the same\r
                    password across different devices/sessions. Since the password is never stored anywhere, any password will\r
                    allow to proceed to the next page, but the password that will be generated will be different for\r
                    each different master password input.`),br.forEach(s),qe=g(f),W=a(f,"P",{class:!0});var ur=l(W);Oe=d(ur,`Once logged in, the user can save/select/delete email addresses for the username they have logged in with\r
                    and, after selecting one of these, they can save/select/delete site names for said email address, all of\r
                    which will remain available for successive log-ins.`),ur.forEach(s),Fe=g(f),J=a(f,"P",{class:!0});var pr=l(J);We=d(pr,"All usernames, email addresses and site names are stored in the indexedDB."),pr.forEach(s),Je=g(f),Q=a(f,"P",{class:!0});var fr=l(Q);Qe=d(fr,`Clicking on the export button while on the log-in page will initiate the download of a file containing all\r
                    the data of the user's session. This data can then be uploaded via\r
                    the Import button on the log-in page, which will allow the user to upload the previously downloaded file.\r
                    Note that importing a session will overwrite any previous data linked to the session.`),fr.forEach(s),Ye=g(f),Y=a(f,"P",{class:!0});var yr=l(Y);Xe=d(yr,`Clicking on the export button while on the email/site page will do the same as in the login page, but just\r
                    with the data of the username currently logged in. Importing this data will not overwrite the data linked\r
                    to the session, but will fail if the username already exists.`),yr.forEach(s),f.forEach(s),gr.forEach(s),Ze=g(b),X=a(b,"H3",{class:!0});var xr=l(X);$e=d(xr,"Keyboard Shortcuts"),xr.forEach(s),et=g(b),Z=a(b,"DIV",{class:!0});var mr=l(Z);o=a(mr,"P",{class:!0});var i=l(o);$=a(i,"KBD",{class:!0});var kr=l($);tt=d(kr,"Ctrl"),kr.forEach(s),rt=d(i,`\r
                +\r
                `),K=a(i,"KBD",{class:!0});var De=l(K);x=Ie(De,"svg",{class:!0,"aria-hidden":!0,fill:!0,xmlns:!0,viewBox:!0});var vr=l(x);ve=Ie(vr,"path",{d:!0}),l(ve).forEach(s),vr.forEach(s),at=g(De),ee=a(De,"SPAN",{class:!0});var wr=l(ee);st=d(wr,"Arrow key up"),wr.forEach(s),De.forEach(s),lt=d(i,`\r
                /\r
                `),te=a(i,"KBD",{class:!0});var _r=l(te);ot=d(_r,"Ctrl"),_r.forEach(s),nt=d(i,`\r
                +\r
                `),I=a(i,"KBD",{class:!0});var Pe=l(I);m=Ie(Pe,"svg",{class:!0,"aria-hidden":!0,fill:!0,xmlns:!0,viewBox:!0});var Er=l(m);we=Ie(Er,"path",{d:!0}),l(we).forEach(s),Er.forEach(s),dt=g(Pe),re=a(Pe,"SPAN",{class:!0});var Br=l(re);it=d(Br,"Arrow key down"),Br.forEach(s),Pe.forEach(s),ct=d(i,`\r
                : can be used to move up or down among text input fields`),gt=a(i,"BR",{}),ht=g(i),ae=a(i,"KBD",{class:!0});var Dr=l(ae);bt=d(Dr,"Enter"),Dr.forEach(s),ut=d(i,`\r
                : can be used to advance to the next input or click on the next button`),pt=a(i,"BR",{}),ft=g(i),se=a(i,"KBD",{class:!0});var Pr=l(se);yt=d(Pr,"Alt"),Pr.forEach(s),xt=d(i,`\r
                +\r
                `),le=a(i,"KBD",{class:!0});var Cr=l(le);mt=d(Cr,"Enter"),Cr.forEach(s),kt=d(i,`\r
                : on the login page can be used to register a username`),vt=a(i,"BR",{}),wt=g(i),oe=a(i,"KBD",{class:!0});var Kr=l(oe);_t=d(Kr,"Ctrl"),Kr.forEach(s),Et=d(i,`\r
                +\r
                `),ne=a(i,"KBD",{class:!0});var Ir=l(ne);Bt=d(Ir,"Backspace"),Ir.forEach(s),Dt=d(i,`\r
                : can be used to return to the login page from the email/site page`),Pt=a(i,"BR",{}),Ct=g(i),de=a(i,"KBD",{class:!0});var Ar=l(de);Kt=d(Ar,"Ctrl"),Ar.forEach(s),It=d(i,`\r
                +\r
                `),ie=a(i,"KBD",{class:!0});var Sr=l(ie);At=d(Sr,"Del"),Sr.forEach(s),St=d(i,`\r
                : can be used to delete a saved email or site`),Nt=a(i,"BR",{}),Tt=g(i),ce=a(i,"KBD",{class:!0});var Nr=l(ce);Lt=d(Nr,"Ctrl"),Nr.forEach(s),jt=d(i,`\r
                +\r
                `),ge=a(i,"KBD",{class:!0});var Tr=l(ge);zt=d(Tr,"S"),Tr.forEach(s),Mt=d(i,`\r
                : can be used to toggle password visibility`),Rt=a(i,"BR",{}),Gt=g(i),he=a(i,"KBD",{class:!0});var Lr=l(he);Ht=d(Lr,"Ctrl"),Lr.forEach(s),Vt=d(i,`\r
                +\r
                `),be=a(i,"KBD",{class:!0});var jr=l(be);Ut=d(jr,"C"),jr.forEach(s),qt=d(i,`\r
                : can be used after generating a password to copy it to the clipboard`),i.forEach(s),mr.forEach(s),Ot=g(b),ue=a(b,"H2",{class:!0});var zr=l(ue);Ft=d(zr,"License"),zr.forEach(s),Wt=g(b),pe=a(b,"P",{class:!0});var Mr=l(pe);Jt=d(Mr,"This program is released under the GPLv3 license."),Mr.forEach(s),Qt=g(b),T=a(b,"P",{class:!0});var er=l(T);Yt=d(er,`All the source code is free and available at \r
            `),w=a(er,"A",{href:!0,target:!0,rel:!0,class:!0});var Rr=l(w);Xt=d(Rr,"GitHub"),Rr.forEach(s),er.forEach(s),b.forEach(s),Zt=g(xe),fe=a(xe,"FOOTER",{class:!0});var Gr=l(fe);_e=a(Gr,"DIV",{});var Hr=l(_e);k=a(Hr,"FORM",{action:!0,method:!0,target:!0});var Ce=l(k);ye=a(Ce,"INPUT",{type:!0,name:!0}),$t=g(Ce),_=a(Ce,"INPUT",{type:!0,src:!0,name:!0,title:!0,alt:!0}),Ce.forEach(s),Hr.forEach(s),Gr.forEach(s),xe.forEach(s),this.h()},h(){t(E,"href",v+"/manifest.json"),t(E,"rel","manifest"),t(L,"href",v+"/apple-touch-icon.png"),t(L,"rel","apple-touch-icon"),t(B,"href",v+"/favicon-32x32.png"),t(B,"rel","icon"),t(B,"sizes","32x32"),t(B,"type","image/png"),t(D,"href",v+"/favicon-16x16.png"),t(D,"rel","icon"),t(D,"sizes","16x16"),t(D,"type","image/png"),t(S,"color","#5bbad5"),t(S,"href",v+"/safari-pinned-tab.svg"),t(S,"rel","mask-icon"),t(N,"href",v+"/favicon.ico"),t(N,"rel","icon"),t(N,"sizes","any"),t(P,"href",v+"/icon.svg"),t(P,"rel","icon"),t(P,"sizes","any"),t(P,"type","image/svg+xml"),t(j,"content","#00aba9"),t(j,"name","msapplication-TileColor"),t(z,"content",v+"/browserconfig.xml"),t(z,"name","msapplication-config"),t(R,"href",v+"/"),t(G,"href",v+"/cookies"),t(C,"class","w-full flex items-center justify-end gap-6 md:gap-12 pr-4 text-gray-900 dark:text-white"),t(M,"class","bg-gray-300 border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-900"),t(H,"class","mb-4 text-4xl font-extrabold leading-none tracking-tight text-black md:text-5xl lg:text-6xl dark:text-white"),t(V,"class","mb-3 text-lg font-light text-black md:text-xl dark:text-gray-100"),t(U,"class","text-4xl font-extrabold dark:text-white"),t(O,"class","mb-3 font-light text-black dark:text-gray-100"),t(F,"class","mb-3 font-light text-black dark:text-gray-100"),t(W,"class","mb-3 font-light text-black dark:text-gray-100"),t(J,"class","mb-3 font-light text-black dark:text-gray-100"),t(Q,"class","mb-3 font-light text-black dark:text-gray-100"),t(Y,"class","mb-3 font-light text-black dark:text-gray-100"),t(u,"class","text-justify w-[80%]"),t(q,"class","flex justify-center"),t(X,"class","text-3xl font-bold dark:text-white"),t($,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-black"),t(ve,"d","M9.39 265.4l127.1-128C143.6 131.1 151.8 128 160 128s16.38 3.125 22.63 9.375l127.1 128c9.156 9.156 11.9 22.91 6.943 34.88S300.9 320 287.1 320H32.01c-12.94 0-24.62-7.781-29.58-19.75S.2333 274.5 9.39 265.4z"),t(x,"class","w-3 h-3"),t(x,"aria-hidden","true"),t(x,"fill","currentColor"),t(x,"xmlns","http://www.w3.org/2000/svg"),t(x,"viewBox","0 0 320 512"),t(ee,"class","sr-only"),t(K,"class","inline-flex items-center px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(te,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(we,"d","M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"),t(m,"class","w-3 h-3"),t(m,"aria-hidden","true"),t(m,"fill","currentColor"),t(m,"xmlns","http://www.w3.org/2000/svg"),t(m,"viewBox","0 0 320 512"),t(re,"class","sr-only"),t(I,"class","inline-flex items-center px-2 py-1.5 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(ae,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(se,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(le,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(oe,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(ne,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(de,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(ie,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(ce,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(ge,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(he,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(be,"class","px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"),t(o,"class","mb-3 font-light text-black dark:text-gray-100 text-left"),t(Z,"class","flex justify-center"),t(ue,"class","text-4xl font-extrabold dark:text-white"),t(pe,"class","mb-3 font-light text-black dark:text-gray-100"),t(w,"href","https://github.com/lucasmdjl96/my-password-gen"),t(w,"target","_blank"),t(w,"rel","noreferrer"),t(w,"class","font-medium text-blue-600 underline dark:text-blue-500 dark:hover:text-blue-600 hover:text-blue-700 hover:no-underline"),t(T,"class","mb-3 font-light text-black dark:text-gray-100"),t(h,"class","text-center"),t(ye,"type","hidden"),t(ye,"name","hosted_button_id"),ye.value="WCRYMKW6UAJRC",t(_,"type","image"),Jr(_.src,rr="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif")||t(_,"src",rr),t(_,"name","submit"),t(_,"title","PayPal - The safer, easier way to pay online!"),t(_,"alt","Donate with PayPal button"),t(k,"action","https://www.paypal.com/donate"),t(k,"method","post"),t(k,"target","_top"),t(fe,"class","p-4 bg-gray-300 shadow flex items-center justify-end dark:bg-gray-900"),t(y,"class","h-full flex flex-col justify-between bg-blue-300 dark:bg-gray-800 overflow-y-auto")},m(A,p){e(document.head,E),e(document.head,L),e(document.head,B),e(document.head,D),e(document.head,S),e(document.head,N),e(document.head,P),e(document.head,j),e(document.head,z),Vr(A,Ee,p),Vr(A,y,p),e(y,M),e(M,C),e(C,me),e(me,R),e(R,Ae),e(C,Se),e(C,ke),e(ke,G),e(G,Ne),e(y,Te),e(y,h),e(h,H),e(H,Le),e(h,je),e(h,V),e(V,ze),e(h,Me),e(h,U),e(U,Re),e(h,Ge),e(h,q),e(q,u),e(u,O),e(O,He),e(u,Ve),e(u,F),e(F,Ue),e(u,qe),e(u,W),e(W,Oe),e(u,Fe),e(u,J),e(J,We),e(u,Je),e(u,Q),e(Q,Qe),e(u,Ye),e(u,Y),e(Y,Xe),e(h,Ze),e(h,X),e(X,$e),e(h,et),e(h,Z),e(Z,o),e(o,$),e($,tt),e(o,rt),e(o,K),e(K,x),e(x,ve),e(K,at),e(K,ee),e(ee,st),e(o,lt),e(o,te),e(te,ot),e(o,nt),e(o,I),e(I,m),e(m,we),e(I,dt),e(I,re),e(re,it),e(o,ct),e(o,gt),e(o,ht),e(o,ae),e(ae,bt),e(o,ut),e(o,pt),e(o,ft),e(o,se),e(se,yt),e(o,xt),e(o,le),e(le,mt),e(o,kt),e(o,vt),e(o,wt),e(o,oe),e(oe,_t),e(o,Et),e(o,ne),e(ne,Bt),e(o,Dt),e(o,Pt),e(o,Ct),e(o,de),e(de,Kt),e(o,It),e(o,ie),e(ie,At),e(o,St),e(o,Nt),e(o,Tt),e(o,ce),e(ce,Lt),e(o,jt),e(o,ge),e(ge,zt),e(o,Mt),e(o,Rt),e(o,Gt),e(o,he),e(he,Ht),e(o,Vt),e(o,be),e(be,Ut),e(o,qt),e(h,Ot),e(h,ue),e(ue,Ft),e(h,Wt),e(h,pe),e(pe,Jt),e(h,Qt),e(h,T),e(T,Yt),e(T,w),e(w,Xt),e(y,Zt),e(y,fe),e(fe,_e),e(_e,k),e(k,ye),e(k,$t),e(k,_)},p:tr,i:tr,o:tr,d(A){s(E),s(L),s(B),s(D),s(S),s(N),s(P),s(j),s(z),A&&s(Ee),A&&s(y)}}}class $r extends qr{constructor(E){super(),Or(this,E,null,Qr,Fr,{})}}export{$r as default};