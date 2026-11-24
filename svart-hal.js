/* =====================================================================
   svart-hal.js: strålföljning kring ett icke-roterande svart hål (WebGL2).
   Används av fysik2-svart-hal-app.html.

   Fysiken (längdenheten är Schwarzschildradien, r_s = 1):
   - Varje bildpunkts ljusstråle följs BAKÅT från kameran. Banan för ljus i
     Schwarzschilds rumtid uppfyller (du/dφ)² = 1/b² − u² + u³ med u = 1/r.
     Samma bana fås av rörelseekvationen x'' = −3/2 · h² · x/r⁵ där
     h = |x × x'| är konstant. Den integreras med leapfrog.
   - Kameran står stilla på avståndet r. Riktningen i dess lokala
     referenssystem räknas om: radiella komposanten gånger √(1 − 1/r).
     Då blir skuggans vinkelradie exakt sin ψ = (3√3/2)/r · √(1 − 1/r).
   - k (0 till 1) skalar ljusböjningen. k = 0 ger raka strålar.
   - Skivan ligger i planet y = 0 mellan r = 3 (innersta stabila banan)
     och R_UT. Gasen går i cirkelbanor med Ω = √(1/(2r³)).
     Rödförskjutningsfaktorn är g = √(1 − 3/(2r)) / (1 − Ω · L/E),
     delad med kamerans √(1 − 1/r_kam). Svartkroppsstrålning med
     temperaturen T ses som svartkroppsstrålning med temperaturen g·T.
   - Förenklat för ögats skull: skivans temperatur och ljusstyrka. En
     verklig skiva kring ett stjärnmassivt hål lyser mest i röntgen, och
     skillnaderna i ljusstyrka är mycket större (g⁴ i stället för g^2,2).
   ===================================================================== */
(function () {
    'use strict';

    var R_UT = 11.5;

    var VERT = '#version 300 es\nout vec2 uv;void main(){vec2 p=vec2((gl_VertexID<<1)&2,gl_VertexID&2);uv=p;gl_Position=vec4(p*2.-1.,0.,1.);}';

    var NOISE = [
        'float hash(vec3 p){p=fract(p*vec3(.1031,.1030,.0973));p+=dot(p,p.yxz+33.33);return fract((p.x+p.y)*p.z);}',
        'float vn(vec3 p){vec3 i=floor(p),f=p-i;f=f*f*(3.-2.*f);',
        ' return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),',
        ' mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}',
        'float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<5;i++){s+=a*vn(p);p=p*2.07+vec3(17.1,3.7,9.2);a*=.5;}return s;}'
    ].join('\n');

    // Himlen ritas en gång till en ekvirektangulär textur (kodad som √färg).
    var HIMMEL = '#version 300 es\nprecision highp float;in vec2 uv;out vec4 ut;uniform vec3 galN;uniform vec3 gal;\n' + NOISE + `
    void main(){
        float ph=(uv.x-.5)*6.2831853, th=(uv.y-.5)*3.1415927;
        vec3 d=vec3(cos(th)*cos(ph),sin(th),cos(th)*sin(ph));
        float h=dot(d,galN);
        vec3 w=vec3(fbm(d*3.1),fbm(d*3.1+7.),fbm(d*3.1+13.))-.48;
        float hh=h+w.x*.16;
        float band=exp(-hh*hh*22.);
        float karna=exp(-pow(acos(clamp(dot(d,normalize(cross(galN,vec3(.2,.1,1.)))),-1.,1.))/.55,2.));
        float moln=fbm(d*6.+w*2.);
        float damm=smoothstep(.40,.66,fbm(d*8.+w*3.+3.))*exp(-hh*hh*70.);
        vec3 c=vec3(.0012,.0018,.0038);
        c+=band*(.05+1.5*moln*moln)*.62*mix(vec3(.045,.055,.095),vec3(.15,.115,.085),clamp(karna*1.3,0.,1.))*(1.+karna*1.5);
        c*=1.-.82*damm;
        c+=vec3(.06,.016,.03)*pow(fbm(d*5.+21.),4.)*band*3.;
        c+=vec3(.010,.016,.032)*pow(fbm(d*2.+40.),4.)*1.2;
        // En spiralgalax i en bestämd riktning: den som ger Einsteinringen.
        vec3 e1=normalize(cross(gal,vec3(.2,1.,.1))), e2=cross(gal,e1);
        vec2 q=vec2(dot(d,e1),dot(d,e2))/.040;
        q.y*=1.35;
        float rr=length(q), a=atan(q.y,q.x);
        if(dot(d,gal)>0.&&rr<3.){
            float arm=.5+.5*cos(2.*a-5.5*log(rr+.06));
            vec3 g=vec3(1.,.82,.55)*exp(-rr*rr*9.)*1.7+vec3(.36,.5,.95)*exp(-rr*1.9)*pow(arm,1.6)*(.5+fbm(d*260.))*1.25+vec3(.42,.36,.36)*exp(-rr*2.1)*.5;
            c+=g*(.25+1.5*pow(fbm(d*150.),1.5))*smoothstep(2.6,1.2,rr)*.3;
        }
        ut=vec4(sqrt(clamp(c,0.,1.)),1.);
    }`;

    var STJ_V = `#version 300 es
    in vec3 d;in vec4 f;out vec3 farg;out float sx;
    uniform float H;
    void main(){
        float th=asin(clamp(d.y,-1.,1.)), ph=atan(d.z,d.x);
        gl_Position=vec4(ph/3.1415927,th/1.5707963,0.,1.);
        sx=min(1./max(cos(th),.02),16.);
        gl_PointSize=f.w*sx;farg=f.rgb;
    }`;
    var STJ_F = `#version 300 es
    precision highp float;in vec3 farg;in float sx;out vec4 ut;
    void main(){vec2 p=gl_PointCoord*2.-1.;p.y*=sx;float a=exp(-dot(p,p)*3.2)*step(dot(p,p),1.);ut=vec4(farg*a,1.);}`;

    var SCEN = '#version 300 es\nprecision highp float;precision highp int;in vec2 uv;out vec4 ut;\n' +
        'uniform vec3 kam;uniform mat3 bas;uniform vec2 tan2;uniform float k,tid,skiva,dopp,rut,texW,tele;uniform sampler2D himmel;uniform highp sampler3D brus;\n' + `
    // Bruset läses ur en 3D-textur (32³, upprepad): många gånger snabbare än att räkna.
    float vn(vec3 p){vec3 i=floor(p),f=p-i;f=f*f*(3.-2.*f);return textureLod(brus,(i+f+.5)/32.,0.).r;}
    float fbm(vec3 p){float a=.5,s=0.;for(int i=0;i<4;i++){s+=a*vn(p);p=p*2.07+vec3(17.1,3.7,9.2);a*=.5;}return s+.016;}
    const float RI=3.0, RU=${R_UT.toFixed(1)};
    // Plancks lag i tre våglängder (0,61, 0,55, 0,465 µm), normerad mot 6 500 K.
    vec3 bb(float T){
        vec3 x=14388./(vec3(.61,.55,.465)*T), x0=14388./(vec3(.61,.55,.465)*6500.);
        vec3 c=pow((exp(x0)-1.)/(exp(min(x,vec3(60.)))-1.),vec3(1.3));
        return c/max(c.x,max(c.y,c.z));
    }
    // Bilder som gått runt hålet är hopträngda: där tas de finaste strimmorna bort.
    float detalj=1.;
    float strimmor(float r,float ph,float t){
        // Differentiell rotation: två mönster som tonas om varandra, så att
        // skivan inte lindas upp till allt tunnare spiraler.
        const float P=26.;
        float om=sqrt(.5/(r*r*r)), s=0.;
        for(int i=0;i<2;i++){
            float fas=fract(t/P+.5*float(i));
            float vikt=1.-abs(2.*fas-1.);
            float a=ph-om*(fas-.2)*P*2.2+2.6*log(r)+float(i)*2.1 - t*.02;
            vec3 q=vec3(cos(a)*2.1,sin(a)*2.1,r*1.15+float(i)*31.);
            float n=fbm(q+vec3(0.,0.,vn(q*.8)*1.2));
            float fin=vn(vec3(cos(a)*5.,sin(a)*5.,r*9.+float(i)*13.));
            float fin2=vn(vec3(cos(a)*9.,sin(a)*9.,r*26.));
            s+=vikt*(n*.66+mix(.5,fin,detalj)*.24+mix(.5,fin2,detalj)*.10);
        }
        return s;
    }
    vec4 gas(vec3 p,vec3 v,float E){
        float r=length(p);
        if(r<RI||r>RU) return vec4(0.);
        float ph=atan(p.z,p.x);
        float n=strimmor(r,ph,tid);n=clamp((n-.48)*1.75+.48,0.,1.2);
        float prof=smoothstep(RI,RI+.45,r)*smoothstep(RU,RI+1.5,r);
        float tat=prof*smoothstep(.20,.85,n+.22*prof);
        float T=5900.*pow(RI/r,.50)*(.80+.36*n);
        float Ly=p.z*v.x-p.x*v.z;  // ljusets rörelsemängdsmoment längs gasens rotation (v är bakåtspårad)
        float om=sqrt(.5/(r*r*r));
        float g=sqrt(1.-1.5/r)/sqrt(1.-1./length(kam))/(1.-om*Ly/E);
        g=mix(1.,g,dopp);
        T*=g;
        float lum=pow(T/4300.,2.2)*(.06+1.75*n*n*n)*1.2;
        // Teleskopvyn: radioljuset kommer mest från gasen närmast hålet.
        if(tele>.5) lum*=pow(RI/r,2.4)*pow(max(g,.05),.2);
        float cosv=abs(v.y)/length(v);
        float alfa=1.-exp(-tat*1.5/max(cosv,.16));
        return vec4(bb(clamp(T,900.,30000.))*lum,alfa);
    }
    vec3 bakgrund(vec3 d,vec3 w,vec2 wt){
        vec2 t=vec2(atan(d.z,d.x)/6.2831853+.5,asin(clamp(d.y,-1.,1.))/3.1415927+.5);
        float lod=log2(max(length(w)*texW/6.2831853*.6,1e-4));
        vec3 c=textureLod(himmel,t,clamp(lod,0.,9.)).rgb;c*=c;c*=2.2;
        if(rut>.5){
            vec2 gr=vec2(24.,12.), a=abs(fract(t*gr-.5)-.5), fw=clamp(wt*gr,vec2(.002),vec2(.5));
            float l=max(1.-smoothstep(fw.x*.5,fw.x*1.4,a.x),(1.-smoothstep(fw.y*.5,fw.y*1.4,a.y)));
            c=mix(c,vec3(.10,.30,.40),l*.8);
        }
        return c;
    }
    // Följer en stråle. Ger skivans ljus, hur mycket som släpps igenom (gen)
    // och riktningen ut mot himlen (gen = 0 om strålen slutar i hålet).
    vec3 folj(vec2 skarm,out float gen,out vec3 ut_,out float bq){
        vec3 v=normalize(bas*vec3(skarm*tan2,-1.));
        vec3 x=kam;
        float r=length(x);
        vec3 er=x/r;
        float vr=dot(v,er);
        v=(v-vr*er)+er*vr*sqrt(max(1.-k/r,0.));    // lokal riktning till koordinatriktning
        v=normalize(v);
        vec3 hv=cross(x,v);
        float h2=dot(hv,hv);
        float E=sqrt(max(1.-k*h2/(r*r*r),1e-5));
        bq=sqrt(h2)/E/2.598076;
        vec3 farg=vec3(0.);gen=1.;
        vec3 p1,v1,p2,v2,p3,v3;int nt=0;
        vec3 acc=-1.5*k*h2*x/pow(r,5.);
        float ytter=max(length(kam)*1.1,24.);
        for(int i=0;i<420;i++){
            float ds=(r<4.?.08:min(.08+.012*(r-4.),.2))*r/length(v);
            vec3 x0=x;
            v+=acc*ds*.5;
            x+=v*ds;
            float r2=dot(x,x);r=sqrt(r2);
            acc=-1.5*k*h2*x/(r2*r2*r);
            v+=acc*ds*.5;
            if(skiva>.5&&x0.y*x.y<0.){
                vec3 p=mix(x0,x,x0.y/(x0.y-x.y));
                float rp=dot(p,p);
                if(rp>RI*RI&&rp<RU*RU){
                    if(nt==0){p1=p;v1=v;}else if(nt==1){p2=p;v2=v;}else{p3=p;v3=v;}
                    if(++nt==3) break;
                }
            }
            if(r<1.0){gen=0.;break;}
            if(r>ytter&&dot(x,v)>0.) break;
        }
        // Gasen räknas ut efter slingan: då gör alla bildpunkter samma arbete
        // samtidigt, vilket är mycket snabbare på ett grafikkort.
        detalj=1.;
        if(nt>0){vec4 g=gas(p1,v1,E);farg+=g.rgb*g.a;float t=1.-g.a;
            detalj=.15;
            if(nt>1&&t>.01){g=gas(p2,v2,E);farg+=t*g.rgb*g.a;t*=1.-g.a;}
            if(nt>2&&t>.01){g=gas(p3,v3,E);farg+=t*g.rgb*g.a;t*=1.-g.a;}
            gen*=t;}
        ut_=normalize(v);
        return farg;
    }
    void main(){
        vec2 s=uv*2.-1., px=vec2(dFdx(s.x),dFdy(s.y));
        float gen,bq;vec3 d;
        vec3 c=folj(s,gen,d,bq);
        vec3 w=fwidth(d);
        vec2 t=vec2(atan(d.z,d.x)/6.2831853+.5,asin(clamp(d.y,-1.,1.))/3.1415927+.5);
        vec2 wt=fwidth(t);wt.x=min(wt.x,fwidth(fract(t.x+.5)));
        if(gen>0.) c+=gen*bakgrund(d,w,wt)*(1.-tele);
        c=min(c,vec3(12.));
        // Vid skuggans kant är bilderna tunnare än en bildpunkt: fler strålar.
        float dq=abs(bq-max(k,.0001)), kant=fwidth(bq);
        if(dq<.010+kant*1.5){
            vec3 q=c;
            for(int i=0;i<4;i++){
                float a=float(i)*1.5708+.4;
                vec3 c2=folj(s+px*vec2(cos(a),sin(a))*.42,gen,d,bq);
                if(gen>0.) c2+=gen*bakgrund(d,w*.5+.002,wt)*(1.-tele);
                q+=min(c2,vec3(12.));
            }
            c=q/5.;
        }
        ut=vec4(c,1.);
    }`;

    var BLUR = `#version 300 es
    precision highp float;in vec2 uv;out vec4 ut;uniform sampler2D t;uniform vec2 st;uniform float trosk;
    void main(){vec3 c=vec3(0.);float s=0.;
        for(int i=-5;i<=5;i++){float w=exp(-float(i*i)/9.);vec3 q=texture(t,uv+st*float(i)).rgb;
            if(trosk>0.){float l=max(q.r,max(q.g,q.b));q*=smoothstep(trosk*.5,trosk*2.,l);q=min(q,vec3(6.));}
            c+=q*w;s+=w;}
        ut=vec4(c/s,1.);}`;
    var SLUT = `#version 300 es
    precision highp float;in vec2 uv;out vec4 ut;uniform sampler2D t,b0,b1,b2;uniform float tele;
    float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
    vec3 aces(vec3 x){return clamp(x*(2.51*x+.03)/(x*(2.43*x+.59)+.14),0.,1.);}
    void main(){
        if(tele>.5){float l=clamp(dot(texture(b2,uv).rgb,vec3(.4,.4,.2))*4.8,0.,1.);ut=vec4(clamp(vec3(2.*l,2.*l-.5,2.*l-1.),0.,1.),1.);return;}
        vec3 c=texture(t,uv).rgb+texture(b0,uv).rgb*.14+texture(b1,uv).rgb*.11+texture(b2,uv).rgb*.10;
        vec2 q=uv*2.-1.;c*=1.-.16*dot(q,q)*.5;
        c=pow(aces(c*.92),vec3(1./2.2));c+=(h(gl_FragCoord.xy)-.5)/255.;ut=vec4(c,1.);}`;

    function norm(a) { var l = Math.hypot(a[0], a[1], a[2]); return [a[0] / l, a[1] / l, a[2] / l]; }
    function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }

    // Galaxens riktning på himlen. Einsteinringen syns från motsatt håll.
    var GAL = norm([-Math.cos(-0.2), Math.sin(-0.2), 0.0]);

    // Samma strålföljning som i shadern, för EN stråle (på processorn). Strålen
    // rör sig i ett plan genom hålets mitt: e1 pekar mot kameran, e2 vinkelrätt.
    function foljStrale(st, K, t2, sx, sy) {
        var b = K.bas, a = [sx * t2[0], sy * t2[1], -1], k = st.k, i, j;
        var dot = function (p, q) { return p[0] * q[0] + p[1] * q[1] + p[2] * q[2]; };
        var v = norm([0, 1, 2].map(function (j) { return b[j] * a[0] + b[3 + j] * a[1] + b[6 + j] * a[2]; }));
        var x = K.p.slice(), r = Math.hypot(x[0], x[1], x[2]), rc = r, e1 = norm(x), vr = dot(v, e1);
        var tv = [0, 1, 2].map(function (j) { return v[j] - vr * e1[j]; });
        var e2 = Math.hypot(tv[0], tv[1], tv[2]) > 1e-7 ? norm(tv) : norm(cross([0, 1, 0], e1));
        if (e2[1] < 0) e2 = e2.map(function (q) { return -q; });
        var sikt = [vr, dot(v, e2)];
        v = norm([0, 1, 2].map(function (j) { return tv[j] + e1[j] * vr * Math.sqrt(Math.max(1 - k / r, 0)); }));
        var h = cross(x, v), h2 = dot(h, h), ut = [[r, 0]], slut = 'himmel', skiva = null;
        var A = function () { var m = -1.5 * k * h2 / Math.pow(r, 5); return [x[0] * m, x[1] * m, x[2] * m]; };
        var ang = Math.atan2(dot(v, e2), dot(v, e1)), tot = 0, acc = A();
        for (i = 0; i < 900; i++) {
            var ds = (r < 4 ? 0.025 : Math.min(0.033 + 0.004 * (r - 4), 0.07)) * r / Math.hypot(v[0], v[1], v[2]), x0 = x.slice();
            for (j = 0; j < 3; j++) { v[j] += acc[j] * ds / 2; x[j] += v[j] * ds; }
            r = Math.hypot(x[0], x[1], x[2]); acc = A();
            for (j = 0; j < 3; j++) v[j] += acc[j] * ds / 2;
            var na = Math.atan2(dot(v, e2), dot(v, e1)), d = na - ang;
            tot += Math.atan2(Math.sin(d), Math.cos(d)); ang = na;
            if (st.skiva && x0[1] * x[1] < 0) {
                var q = x0[1] / (x0[1] - x[1]), p = [0, 1, 2].map(function (j) { return x0[j] + (x[j] - x0[j]) * q; });
                var rp = Math.hypot(p[0], p[2]);
                if (rp > 3 && rp < 9.5) {   // längre ut är gasen nästan genomskinlig
                    ut.push([dot(p, e1), dot(p, e2)]); slut = 'skiva';
                    skiva = { ovan: x0[1] > 0, bortre: p[0] * K.p[0] + p[2] * K.p[2] < 0, r: rp };
                    break;
                }
            }
            ut.push([dot(x, e1), dot(x, e2)]);
            if (r < 1) { slut = 'hal'; break; }
            if (r > Math.max(rc * 1.5, 45) && dot(x, v) > 0) break;
        }
        // Skivans skärning med strålens plan.
        var l = cross(cross(e1, e2), [0, 1, 0]), linje = null;
        if (st.skiva && Math.hypot(l[0], l[1], l[2]) > 0.02) { l = norm(l); linje = [dot(l, e1), dot(l, e2)]; }
        return { punkter: ut, slut: slut, skiva: skiva, linje: linje, rc: rc, sikt: sikt, vinkel: Math.abs(tot) * 180 / Math.PI };
    }

    function skapa(canvas) {
        var gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' });
        if (!gl) return null;
        var hdr = !!(gl.getExtension('EXT_color_buffer_float') || gl.getExtension('EXT_color_buffer_half_float'));
        function sh(typ, src) {
            var s = gl.createShader(typ); gl.shaderSource(s, src.trim()); gl.compileShader(s);
            if (!gl.getShaderParameter(s, gl.COMPILE_STATUS) && !gl.isContextLost()) throw new Error(gl.getShaderInfoLog(s));
            return s;
        }
        function prog(v, f) {
            var p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, v)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, f));
            gl.linkProgram(p);
            if (!gl.getProgramParameter(p, gl.LINK_STATUS) && !gl.isContextLost()) throw new Error(gl.getProgramInfoLog(p));
            var u = {}, n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) || 0;
            for (var i = 0; i < n; i++) { var a = gl.getActiveUniform(p, i); u[a.name] = gl.getUniformLocation(p, a.name); }
            return { p: p, u: u };
        }
        var pScen = prog(VERT, SCEN), pBlur = prog(VERT, BLUR), pSlut = prog(VERT, SLUT);
        var vao = gl.createVertexArray();

        function tex(w, h, hdrTex, mip) {
            var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
            var f = hdrTex && hdr;
            gl.texImage2D(gl.TEXTURE_2D, 0, f ? gl.RGBA16F : gl.RGBA8, w, h, 0, gl.RGBA, f ? gl.HALF_FLOAT : gl.UNSIGNED_BYTE, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mip ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, mip ? gl.REPEAT : gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            var fb = gl.createFramebuffer(); gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
            return { t: t, fb: fb, w: w, h: h };
        }
        function bort(o) { if (o) { gl.deleteTexture(o.t); gl.deleteFramebuffer(o.fb); } }
        function tri() { gl.bindVertexArray(vao); gl.drawArrays(gl.TRIANGLES, 0, 3); }

        // ── Himlen ───────────────────────────────────────────────────────
        var TW = Math.min(gl.getParameter(gl.MAX_TEXTURE_SIZE), window.innerWidth < 700 ? 2048 : 4096), TH = TW / 2;
        var himmel = tex(TW, TH, false, true);
        (function () {
            var p = prog(VERT, HIMMEL), galN = norm([0.35, 0.80, -0.48]);
            gl.bindFramebuffer(gl.FRAMEBUFFER, himmel.fb); gl.viewport(0, 0, TW, TH);
            gl.useProgram(p.p); gl.uniform3fv(p.u.galN, galN); gl.uniform3fv(p.u.gal, GAL); tri();
            // Stjärnorna: fast slumpfrö, tätare mot Vintergatans plan.
            var seed = 7; function rnd() { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; }
            var N = 15000, buf = new Float32Array(N * 7), sk = TW / 4096, n = 0;
            while (n < N) {
                var z = rnd() * 2 - 1, a = rnd() * 6.2832, q = Math.sqrt(1 - z * z), d = [q * Math.cos(a), z, q * Math.sin(a)];
                var lat = d[0] * galN[0] + d[1] * galN[1] + d[2] * galN[2];
                if (rnd() > 0.28 + 0.72 * Math.exp(-lat * lat * 9)) continue;
                var m = Math.pow(rnd(), 7), T = rnd();
                var c = T < 0.25 ? [1, 0.72, 0.5] : T < 0.6 ? [1, 0.94, 0.86] : [0.72, 0.83, 1];
                var l = 0.10 + 0.90 * m;
                buf.set([d[0], d[1], d[2], c[0] * l, c[1] * l, c[2] * l, (1.5 + 4.6 * m) * sk + (sk < 1 ? 0.8 : 0)], n * 7); n++;
            }
            var s = prog(STJ_V, STJ_F), va = gl.createVertexArray(), b = gl.createBuffer();
            gl.bindVertexArray(va); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, buf, gl.STATIC_DRAW);
            var ld = gl.getAttribLocation(s.p, 'd'), lf = gl.getAttribLocation(s.p, 'f');
            gl.enableVertexAttribArray(ld); gl.vertexAttribPointer(ld, 3, gl.FLOAT, false, 28, 0);
            gl.enableVertexAttribArray(lf); gl.vertexAttribPointer(lf, 4, gl.FLOAT, false, 28, 12);
            gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE);
            gl.useProgram(s.p); gl.drawArrays(gl.POINTS, 0, N); gl.disable(gl.BLEND);
            gl.bindTexture(gl.TEXTURE_2D, himmel.t); gl.generateMipmap(gl.TEXTURE_2D);
        })();

        var brus = gl.createTexture();
        (function () {
            var n = 32768, d = new Uint8Array(n), seed = 11;
            for (var i = 0; i < n; i++) { seed = (seed * 1664525 + 1013904223) >>> 0; d[i] = seed >>> 24; }
            gl.bindTexture(gl.TEXTURE_3D, brus);
            gl.texImage3D(gl.TEXTURE_3D, 0, gl.R8, 32, 32, 32, 0, gl.RED, gl.UNSIGNED_BYTE, d);
            [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER].forEach(function (f) { gl.texParameteri(gl.TEXTURE_3D, f, gl.LINEAR); });
            [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T, gl.TEXTURE_WRAP_R].forEach(function (f) { gl.texParameteri(gl.TEXTURE_3D, f, gl.REPEAT); });
        })();

        // ── Läge ─────────────────────────────────────────────────────────
        var st = { az: 0.6, el: 0.19, r: 27, k: 1, skiva: true, dopp: true, rut: false, spelar: true, fart: 1, tele: false };
        var mal = null;                 // kameraflygning {az, el, r, t, fran}
        var tid = 40, smutsig = true, synlig = true, dod = false, raf = 0, forra = 0;
        var mal_px = null, scen = null, bl = [], lyssnare = null;
        var kval = window.innerWidth < 700 ? Math.min(window.devicePixelRatio || 1, 1.3) : Math.min(window.devicePixelRatio || 1, 1.25);
        var KMAX = Math.min(window.devicePixelRatio || 1, 1.5), KMIN = 0.35;
        var snitt = 16, nSn = 0, uppVanta = 6, sedanByte = 0;

        function storlek() {
            var b = canvas.getBoundingClientRect();
            var w = Math.max(2, Math.round(b.width * kval)), h = Math.max(2, Math.round(b.height * kval));
            if (scen && scen.w === w && scen.h === h) return;
            canvas.width = w; canvas.height = h;
            bort(scen); bl.forEach(bort);
            scen = tex(w, h, true);
            bl = [];
            for (var i = 0; i < 3; i++) {
                var d = 4 << i, bw = Math.max(1, (w / d) | 0), bh = Math.max(1, (h / d) | 0);
                bl.push(tex(bw, bh, true), tex(bw, bh, true));
            }
            smutsig = true; if (lyssnare) lyssnare(st);
        }
        function kamera() {
            var ce = Math.cos(st.el), p = [st.r * ce * Math.cos(st.az), st.r * Math.sin(st.el), st.r * ce * Math.sin(st.az)];
            var f = norm([-p[0], -p[1], -p[2]]);
            var h = [-Math.sin(st.az), 0, Math.cos(st.az)];   // vågrätt, även rakt uppifrån
            var hog = norm([-h[0], 0, -h[2]]), upp = cross(hog, f);
            return { p: p, bas: new Float32Array([hog[0], hog[1], hog[2], upp[0], upp[1], upp[2], -f[0], -f[1], -f[2]]) };
        }
        function tangenter() {
            var asp = scen.w / scen.h, th = Math.tan(22 * Math.PI / 180);
            // Stående skärm: håll bredden så att hela skivan ryms.
            return asp < 1.45 ? [th * 1.45, th * 1.45 / asp] : [th * asp, th];
        }
        function bindTex(n, o, u) { gl.activeTexture(gl.TEXTURE0 + n); gl.bindTexture(gl.TEXTURE_2D, o.t); gl.uniform1i(u, n); }
        function rita() {
            storlek();
            var K = kamera(), t2 = tangenter(), u = pScen.u;
            gl.bindFramebuffer(gl.FRAMEBUFFER, scen.fb); gl.viewport(0, 0, scen.w, scen.h);
            gl.useProgram(pScen.p);
            gl.uniform3fv(u.kam, K.p); gl.uniformMatrix3fv(u.bas, false, K.bas); gl.uniform2fv(u.tan2, t2);
            gl.uniform1f(u.k, st.k); gl.uniform1f(u.tid, tid); gl.uniform1f(u.skiva, st.skiva ? 1 : 0);
            gl.uniform1f(u.dopp, st.dopp ? 1 : 0); gl.uniform1f(u.rut, st.rut ? 1 : 0); gl.uniform1f(u.texW, TW); gl.uniform1f(u.tele, st.tele ? 1 : 0);
            bindTex(0, himmel, u.himmel);
            gl.activeTexture(gl.TEXTURE4); gl.bindTexture(gl.TEXTURE_3D, brus); gl.uniform1i(u.brus, 4); tri();
            gl.useProgram(pBlur.p);
            // Teleskopets upplösning: oskärpans halvvärdesbredd är ungefär halva
            // skuggans diameter (EHT: 20 mot 42 mikrobågsekunder).
            var sig = 0.2 * 5.2 / st.r / (2 * t2[1]) / 2.12;
            var kalla = scen;
            for (var i = 0; i < 3; i++) {
                var a = bl[2 * i], b = bl[2 * i + 1];
                gl.viewport(0, 0, a.w, a.h);
                gl.bindFramebuffer(gl.FRAMEBUFFER, a.fb); bindTex(0, kalla, pBlur.u.t);
                gl.uniform1f(pBlur.u.trosk, i === 0 && !st.tele ? 0.55 : 0); gl.uniform2f(pBlur.u.st, st.tele && i === 2 ? sig * t2[1] / t2[0] : 1 / a.w, 0); tri();
                gl.bindFramebuffer(gl.FRAMEBUFFER, b.fb); bindTex(0, a, pBlur.u.t);
                gl.uniform1f(pBlur.u.trosk, 0); gl.uniform2f(pBlur.u.st, 0, st.tele && i === 2 ? sig : 1 / a.h); tri();
                kalla = b;
            }
            gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0, 0, scen.w, scen.h);
            gl.useProgram(pSlut.p); gl.uniform1f(pSlut.u.tele, st.tele ? 1 : 0);
            bindTex(0, scen, pSlut.u.t); bindTex(1, bl[1], pSlut.u.b0); bindTex(2, bl[3], pSlut.u.b1); bindTex(3, bl[5], pSlut.u.b2);
            tri();
        }
        function anpassa(dt) {
            // Skärpan följer grafikkortet: ned direkt, upp försiktigt.
            if (dt > 250) return;
            snitt += (dt - snitt) * 0.08; nSn++; sedanByte += dt / 1000;
            if (nSn < 30) return;
            if (snitt > 24 && kval > KMIN) { kval = Math.max(KMIN, kval * Math.max(0.65, Math.sqrt(19 / snitt))); nSn = 0; uppVanta = Math.min(uppVanta * 2, 60); sedanByte = 0; snitt = 16; }
            else if (snitt < 18.5 && kval < KMAX && sedanByte > uppVanta) { kval = Math.min(KMAX, kval * 1.15); nSn = 0; sedanByte = 0; }
        }
        function bild(nu) {
            if (dod) return;
            raf = requestAnimationFrame(bild);
            var dt = forra ? nu - forra : 16; forra = nu;
            if (!synlig || gl.isContextLost()) return;
            var ds = Math.min(dt, 60) / 1000;
            if (mal) {
                mal.t = Math.min(1, mal.t + ds / 1.8);
                var e = mal.t * mal.t * (3 - 2 * mal.t);
                ['az', 'el'].forEach(function (n) { st[n] = mal.fran[n] + (mal[n] - mal.fran[n]) * e; });
                st.r = Math.exp(Math.log(mal.fran.r) + (Math.log(mal.r) - Math.log(mal.fran.r)) * e);
                if (mal.t >= 1) mal = null;
                smutsig = true; if (lyssnare) lyssnare(st);
            }
            if (st.spelar) { tid += ds * st.fart * 2.2; smutsig = true; }
            if (!smutsig) { nSn = 0; return; }
            smutsig = false;
            rita(); anpassa(dt);
        }
        var ro = new ResizeObserver(function () { smutsig = true; }); ro.observe(canvas);
        var io = new IntersectionObserver(function (p) { synlig = p[p.length - 1].isIntersecting; smutsig = true; }); io.observe(canvas);
        raf = requestAnimationFrame(bild);

        // ── Dra, nyp och rulla ───────────────────────────────────────────
        var tryck = null, pek = {}, nyp = 0, RMIN = 6, RMAX = 60;
        function meddela() { smutsig = true; if (lyssnare) lyssnare(st); }
        function avst() { var i = Object.keys(pek); return i.length < 2 ? 0 : Math.hypot(pek[i[0]].x - pek[i[1]].x, pek[i[0]].y - pek[i[1]].y); }
        function ned(e) { pek[e.pointerId] = { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t: performance.now(), flera: Object.keys(pek).length > 0 }; nyp = avst(); mal = null; try { canvas.setPointerCapture(e.pointerId); } catch (x) {} }
        function dra(e) {
            var p = pek[e.pointerId]; if (!p) return;
            var dx = e.clientX - p.x, dy = e.clientY - p.y; p.x = e.clientX; p.y = e.clientY;
            if (Object.keys(pek).length >= 2) { var d = avst(); if (nyp && d) api.satt({ r: st.r * nyp / d }); nyp = d; }
            else { st.az += dx * 0.006; st.el = Math.max(-1.5, Math.min(1.5, st.el + dy * 0.005)); }
            meddela();
        }
        function upp(e) {
            var p = pek[e.pointerId], b;
            if (p && !p.flera && tryck && e.type === 'pointerup' && performance.now() - p.t < 450 && Math.hypot(e.clientX - p.x0, e.clientY - p.y0) < 6) {
                b = canvas.getBoundingClientRect(); tryck((e.clientX - b.left) / b.width, (e.clientY - b.top) / b.height);
            }
            delete pek[e.pointerId]; nyp = avst(); }
        function hjul(e) { e.preventDefault(); mal = null; api.satt({ r: st.r * Math.exp(Math.max(-60, Math.min(60, e.deltaY)) * 0.0016) }); meddela(); }
        canvas.addEventListener('pointerdown', ned); canvas.addEventListener('pointermove', dra);
        canvas.addEventListener('pointerup', upp); canvas.addEventListener('pointercancel', upp);
        canvas.addEventListener('wheel', hjul, { passive: false });

        var api = {
            satt: function (o) { for (var n in o) st[n] = o[n]; st.r = Math.max(RMIN, Math.min(RMAX, st.r)); smutsig = true; },
            flyg: function (v) {
                var az = v.az == null ? st.az : v.az;
                az = st.az + Math.atan2(Math.sin(az - st.az), Math.cos(az - st.az));
                mal = { az: az, el: v.el, r: v.r, t: 0, fran: { az: st.az, el: st.el, r: st.r } };
            },
            vidAndring: function (f) { lyssnare = f; },
            vidTryck: function (f) { tryck = f; },
            stral: function (px, py) { return scen ? foljStrale(st, kamera(), tangenter(), px * 2 - 1, 1 - py * 2) : null; },
            lage: function () { return st; },
            matt: function () { return { kval: kval, snitt: snitt, w: scen && scen.w, h: scen && scen.h }; },
            lasKvalitet: function (q) { kval = KMAX = KMIN = q; smutsig = true; },
            sluta: function () {
                dod = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
                canvas.removeEventListener('wheel', hjul);
                var x = gl.getExtension('WEBGL_lose_context'); if (x) x.loseContext();
            }
        };
        return api;
    }

    // Kameraläge rakt mitt emot galaxen.
    window.SVARTHAL = { skapa: skapa, MITT_EMOT_GALAXEN: { az: Math.atan2(-GAL[2], -GAL[0]), el: Math.asin(-GAL[1]) } };
})();
