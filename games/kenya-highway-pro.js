        /**
         * 1. COMPLETE KENYAN 47-COUNTY & HIGHWAY DATABASE
         */
        const KENYA_NETWORK = {
            corridors: [
                { id: 'A104', code: 'A104', name: 'Eldoret → Nakuru → Nairobi Expressway', distance: 312, payout: 168000, biome: 'highland', counties: ['Uasin Gishu', 'Kericho', 'Nakuru', 'Kiambu', 'Nairobi'] },
                { id: 'A109', code: 'A109', name: 'Mombasa Port → Voi → Machakos → Nairobi', distance: 485, payout: 195000, biome: 'coastal', counties: ['Mombasa', 'Kilifi', 'Kwale', 'Taita-Taveta', 'Makueni', 'Machakos', 'Kajiado', 'Nairobi'] },
                { id: 'A1', code: 'A1', name: 'Kisumu Lakeport → Kakamega → Kitale → Lodwar', distance: 520, payout: 225000, biome: 'highland', counties: ['Migori', 'Homa Bay', 'Kisii', 'Nyamira', 'Kisumu', 'Siaya', 'Vihiga', 'Nandi', 'Kakamega', 'Bungoma', 'Busia', 'Trans-Nzoia', 'West Pokot', 'Turkana'] },
                { id: 'A2', code: 'A2', name: 'Nairobi → Thika → Nyeri → Isiolo → Marsabit', distance: 540, payout: 240000, biome: 'metropolis', counties: ['Nairobi', 'Murang\'a', 'Kirinyaga', 'Nyeri', 'Nyandarua', 'Laikipia', 'Samburu', 'Isiolo', 'Marsabit'] },
                { id: 'A3_B8', code: 'A3/B8', name: 'Lamu Port → Malindi → Garissa → Mandera', distance: 680, payout: 280000, biome: 'coastal', counties: ['Lamu', 'Tana River', 'Garissa', 'Kitui', 'Embu', 'Tharaka-Nithi', 'Meru', 'Wajir', 'Mandera'] },
                { id: 'B3', code: 'B3', name: 'Narok Mara → Bomet → Kisii → Kisumu', distance: 265, payout: 135000, biome: 'savanna', counties: ['Narok', 'Bomet', 'Baringo', 'Elgeyo-Marakwet', 'Kisii', 'Kisumu'] }
            ],
            counties47: [
                { code: '001', name: 'Mombasa', town: 'Kilindini Port & Nyali', hwy: 'A109', biome: 'coastal' },
                { code: '002', name: 'Kwale', town: 'Diani & Ukunda', hwy: 'A14', biome: 'coastal' },
                { code: '003', name: 'Kilifi', town: 'Kilifi Bridge & Malindi', hwy: 'B8', biome: 'coastal' },
                { code: '004', name: 'Tana River', town: 'Hola & Garsen', hwy: 'B8', biome: 'savanna' },
                { code: '005', name: 'Lamu', town: 'Lamu Port Corridor', hwy: 'C112', biome: 'coastal' },
                { code: '006', name: 'Taita-Taveta', town: 'Voi & Taveta', hwy: 'A109', biome: 'savanna' },
                { code: '007', name: 'Garissa', town: 'Garissa Tana Bridge', hwy: 'A3', biome: 'savanna' },
                { code: '008', name: 'Wajir', town: 'Wajir Highway Hub', hwy: 'B9', biome: 'savanna' },
                { code: '009', name: 'Mandera', town: 'Mandera Border Post', hwy: 'B9', biome: 'savanna' },
                { code: '010', name: 'Marsabit', town: 'Marsabit Trans-North', hwy: 'A2', biome: 'savanna' },
                { code: '011', name: 'Isiolo', town: 'Isiolo Junction', hwy: 'A2', biome: 'savanna' },
                { code: '012', name: 'Meru', town: 'Meru Town & Makutano', hwy: 'B6', biome: 'highland' },
                { code: '013', name: 'Tharaka-Nithi', town: 'Chuka Highway', hwy: 'B6', biome: 'highland' },
                { code: '014', name: 'Embu', town: 'Embu & Sagana', hwy: 'B6', biome: 'highland' },
                { code: '015', name: 'Kitui', town: 'Kitui & Mwingi', hwy: 'A3', biome: 'savanna' },
                { code: '016', name: 'Machakos', town: 'Mlolongo & Konza', hwy: 'A109', biome: 'metropolis' },
                { code: '017', name: 'Makueni', town: 'Mtito Andei & Emali', hwy: 'A109', biome: 'savanna' },
                { code: '018', name: 'Nyandarua', town: 'Ol Kalou & Nyahururu', hwy: 'B5', biome: 'highland' },
                { code: '019', name: 'Nyeri', town: 'Nyeri & Karatina', hwy: 'A2', biome: 'highland' },
                { code: '020', name: 'Kirinyaga', town: 'Kerugoya & Mwea', hwy: 'A2', biome: 'highland' },
                { code: '021', name: 'Murang\'a', town: 'Kenol & Makuyu', hwy: 'A2', biome: 'highland' },
                { code: '022', name: 'Kiambu', town: 'Thika Superhighway & Ruiru', hwy: 'A2', biome: 'metropolis' },
                { code: '023', name: 'Turkana', town: 'Lodwar & Kainuk', hwy: 'A1', biome: 'savanna' },
                { code: '024', name: 'West Pokot', town: 'Kapenguria & Makutano', hwy: 'A1', biome: 'highland' },
                { code: '025', name: 'Samburu', town: 'Maralal & Archer\'s Post', hwy: 'C77', biome: 'savanna' },
                { code: '026', name: 'Trans-Nzoia', town: 'Kitale Agro-Hub', hwy: 'A1', biome: 'highland' },
                { code: '027', name: 'Uasin Gishu', town: 'Eldoret CBD & Uganda Rd', hwy: 'A104', biome: 'highland' },
                { code: '028', name: 'Elgeyo-Marakwet', town: 'Iten Escarpment', hwy: 'C51', biome: 'highland' },
                { code: '029', name: 'Nandi', town: 'Kapsabet & Mosoriot', hwy: 'C39', biome: 'highland' },
                { code: '030', name: 'Baringo', town: 'Kabarnet & Marigat', hwy: 'B4', biome: 'savanna' },
                { code: '031', name: 'Laikipia', town: 'Nanyuki Equator Crossing', hwy: 'A2', biome: 'savanna' },
                { code: '032', name: 'Nakuru', town: 'Nakuru City & Naivasha', hwy: 'A104', biome: 'highland' },
                { code: '033', name: 'Narok', town: 'Narok Town & Suswa', hwy: 'B3', biome: 'savanna' },
                { code: '034', name: 'Kajiado', town: 'Kitengela & Namanga', hwy: 'A104', biome: 'savanna' },
                { code: '035', name: 'Kericho', town: 'Kericho Green Tea Highway', hwy: 'B1', biome: 'highland' },
                { code: '036', name: 'Bomet', town: 'Bomet & Sotik', hwy: 'B3', biome: 'highland' },
                { code: '037', name: 'Kakamega', town: 'Kakamega CBD', hwy: 'A1', biome: 'highland' },
                { code: '038', name: 'Vihiga', town: 'Mbale & Chavakali', hwy: 'A1', biome: 'highland' },
                { code: '039', name: 'Bungoma', town: 'Webuye & Bungoma', hwy: 'A104', biome: 'highland' },
                { code: '040', name: 'Busia', town: 'Malaba & Busia Border', hwy: 'A104', biome: 'highland' },
                { code: '041', name: 'Siaya', town: 'Bondo & Ugunja', hwy: 'C27', biome: 'coastal' },
                { code: '042', name: 'Kisumu', town: 'Kisumu Lakeside City', hwy: 'A1', biome: 'coastal' },
                { code: '043', name: 'Homa Bay', town: 'Homa Bay & Mbita', hwy: 'C19', biome: 'coastal' },
                { code: '044', name: 'Migori', town: 'Migori & Isebania', hwy: 'A1', biome: 'savanna' },
                { code: '045', name: 'Kisii', town: 'Kisii Highlands CBD', hwy: 'B3', biome: 'highland' },
                { code: '046', name: 'Nyamira', town: 'Nyamira Town', hwy: 'B3', biome: 'highland' },
                { code: '047', name: 'Nairobi', town: 'Nairobi Expressway & CBD', hwy: 'A104', biome: 'metropolis' }
            ]
        };

        /**
         * 2. REALISTIC TURBO-DIESEL WEB AUDIO SYNTHESIZER
         */
        const SoundEngine = (() => {
            let ctx = null, engineOsc = null, subOsc = null, engineGain = null, turboOsc = null, turboGain = null;
            let ready = false;

            function init() {
                if (ready) return;
                try {
                    const AudioCtx = window.AudioContext || window.webkitAudioContext;
                    ctx = new AudioCtx();

                    engineOsc = ctx.createOscillator();
                    engineOsc.type = 'sawtooth';
                    engineOsc.frequency.value = 36;

                    subOsc = ctx.createOscillator();
                    subOsc.type = 'triangle';
                    subOsc.frequency.value = 18;

                    const lp = ctx.createBiquadFilter();
                    lp.type = 'lowpass';
                    lp.frequency.value = 145;

                    engineGain = ctx.createGain();
                    engineGain.gain.value = 0;

                    engineOsc.connect(lp);
                    subOsc.connect(lp);
                    lp.connect(engineGain);
                    engineGain.connect(ctx.destination);

                    engineOsc.start();
                    subOsc.start();

                    turboOsc = ctx.createOscillator();
                    turboOsc.type = 'sine';
                    turboOsc.frequency.value = 300;
                    turboGain = ctx.createGain();
                    turboGain.gain.value = 0;
                    turboOsc.connect(turboGain);
                    turboGain.connect(ctx.destination);
                    turboOsc.start();

                    ready = true;
                } catch (e) {}
            }

            function update(speedKmh) {
                if (!ready || !ctx) return;
                if (ctx.state === 'suspended') ctx.resume();
                const ratio = Math.min(1, Math.abs(speedKmh) / 140);
                // Gear-stepped diesel RPM simulation
                const gearRatio = ((Math.abs(speedKmh) % 14) / 14);
                const baseFreq = 32 + ratio * 38 + gearRatio * 22;
                engineOsc.frequency.setTargetAtTime(baseFreq, ctx.currentTime, 0.08);
                subOsc.frequency.setTargetAtTime(baseFreq * 0.5, ctx.currentTime, 0.08);
                engineGain.gain.setTargetAtTime(0.045 + ratio * 0.06, ctx.currentTime, 0.1);

                turboOsc.frequency.setTargetAtTime(340 + ratio * 650, ctx.currentTime, 0.1);
                turboGain.gain.setTargetAtTime(ratio * 0.014, ctx.currentTime, 0.1);
            }

            function playHorn() {
                init();
                if (!ctx) return;
                [233.08, 293.66, 349.23].forEach((freq, i) => {
                    const osc = ctx.createOscillator();
                    const g = ctx.createGain();
                    osc.type = 'sawtooth';
                    osc.frequency.setValueAtTime(freq, ctx.currentTime);
                    g.gain.setValueAtTime(0.085, ctx.currentTime);
                    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
                    osc.connect(g);
                    g.connect(ctx.destination);
                    osc.start(ctx.currentTime + i * 0.02);
                    osc.stop(ctx.currentTime + 0.52);
                });
            }

            function playAirBrake() {
                init();
                if (!ctx) return;
                const len = ctx.sampleRate * 0.25;
                const buf = ctx.createBuffer(1, len, ctx.sampleRate);
                const ch = buf.getChannelData(0);
                for (let i = 0; i < len; i++) ch[i] = Math.random() * 2 - 1;
                const src = ctx.createBufferSource();
                src.buffer = buf;
                const bp = ctx.createBiquadFilter();
                bp.type = 'bandpass';
                bp.frequency.value = 2200;
                const g = ctx.createGain();
                g.gain.setValueAtTime(0.06, ctx.currentTime);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.24);
                src.connect(bp);
                bp.connect(g);
                g.connect(ctx.destination);
                src.start();
            }

            return { init, update, playHorn, playAirBrake };
        })();

        function showToast(msg, tone = 'sky') {
            const feed = document.getElementById('toast-feed');
            const el = document.createElement('div');
            const colors = {
                sky: 'border-sky-400 text-sky-100 bg-slate-950/90',
                emerald: 'border-emerald-400 text-emerald-100 bg-slate-950/90',
                amber: 'border-amber-400 text-amber-100 bg-slate-950/90',
                rose: 'border-rose-400 text-rose-100 bg-slate-950/90'
            };
            el.className = `px-4 py-1.5 rounded-full border font-display font-bold text-xs tracking-wider shadow-xl transition-all duration-300 ${colors[tone] || colors.sky}`;
            el.textContent = msg;
            feed.appendChild(el);
            setTimeout(() => {
                el.style.opacity = '0';
                setTimeout(() => el.remove(), 300);
            }, 2400);
        }

        /**
         * 3. PHOTOREALISTIC PROCEDURAL TEXTURE & BUILDING FACADE GENERATOR
         */
        const RealismAssets = (() => {
            // Realistic Kenyan Tarmac Highway Texture with Aggregate Grain & Yellow/White Markings
            function createAsphaltTexture() {
                const c = document.createElement('canvas');
                c.width = 1024;
                c.height = 1024;
                const ctx = c.getContext('2d');

                ctx.fillStyle = '#1e2229';
                ctx.fillRect(0, 0, 1024, 1024);

                // Realistic asphalt stone aggregate micro-texture
                for (let i = 0; i < 24000; i++) {
                    const x = Math.random() * 1024;
                    const y = Math.random() * 1024;
                    const shade = 22 + Math.floor(Math.random() * 26);
                    ctx.fillStyle = `rgb(${shade},${shade + 2},${shade + 5})`;
                    ctx.fillRect(x, y, 2, 2);
                }

                // Subtle tire wear tracks in each lane
                [165, 385, 635, 855].forEach(lx => {
                    const grad = ctx.createLinearGradient(lx - 45, 0, lx + 45, 0);
                    grad.addColorStop(0, 'rgba(0,0,0,0)');
                    grad.addColorStop(0.5, 'rgba(10,12,16,0.34)');
                    grad.addColorStop(1, 'rgba(0,0,0,0)');
                    ctx.fillStyle = grad;
                    ctx.fillRect(lx - 45, 0, 90, 1024);
                });

                // Solid White Shoulder Lines
                ctx.fillStyle = '#f1f5f9';
                ctx.fillRect(42, 0, 14, 1024);
                ctx.fillRect(968, 0, 14, 1024);

                // Dashed White Lane Dividers
                ctx.fillStyle = '#e2e8f0';
                for (let y = 20; y < 1024; y += 128) {
                    ctx.fillRect(274, y, 10, 68);
                    ctx.fillRect(740, y, 10, 68);
                }

                // Kenyan Double Yellow Center Divider Lines
                ctx.fillStyle = '#eab308';
                ctx.fillRect(500, 0, 8, 1024);
                ctx.fillRect(516, 0, 8, 1024);

                const tex = new THREE.CanvasTexture(c);
                tex.encoding = THREE.sRGBEncoding;
                tex.wrapS = THREE.RepeatWrapping;
                tex.wrapT = THREE.RepeatWrapping;
                tex.anisotropy = 16;
                return tex;
            }

            // Realistic Kenyan Architectural Building Facades (Glass Skyscraper, Commercial Plaza, Swahili Coastal, Petrol Station)
            function createBuildingFacadeTexture(style = 'glass_tower') {
                const c = document.createElement('canvas');
                c.width = 512;
                c.height = 1024;
                const ctx = c.getContext('2d');

                if (style === 'glass_tower') {
                    // Nairobi CBD / Upper Hill Modern Curtain-Wall Skyscraper
                    const glassBase = ctx.createLinearGradient(0, 0, 512, 1024);
                    glassBase.addColorStop(0, '#203f52');
                    glassBase.addColorStop(0.32, '#557681');
                    glassBase.addColorStop(0.56, '#17354a');
                    glassBase.addColorStop(1, '#101f30');
                    ctx.fillStyle = glassBase;
                    ctx.fillRect(0, 0, 512, 1024);

                    // Broad, soft sky reflections make the curtain wall read as glass at a distance.
                    const reflection = ctx.createLinearGradient(0, 70, 512, 480);
                    reflection.addColorStop(0, 'rgba(220,242,239,0.02)');
                    reflection.addColorStop(0.28, 'rgba(203,232,226,0.28)');
                    reflection.addColorStop(0.42, 'rgba(233,242,220,0.07)');
                    reflection.addColorStop(0.7, 'rgba(130,190,204,0.2)');
                    reflection.addColorStop(1, 'rgba(5,16,29,0.16)');
                    ctx.fillStyle = reflection;
                    ctx.fillRect(0, 0, 512, 1024);

                    const cols = 8;
                    const rows = 24;
                    const padX = 3, padY = 4;
                    const w = (512 - padX * (cols + 1)) / cols;
                    const h = (1024 - padY * (rows + 1)) / rows;

                    for (let r = 0; r < rows; r++) {
                        for (let col = 0; col < cols; col++) {
                            const x = padX + col * (w + padX);
                            const y = padY + r * (h + padY);
                            const lit = Math.random() > 0.84;
                            const grad = ctx.createLinearGradient(x, y, x + w, y + h);
                            if (lit) {
                                grad.addColorStop(0, '#c7c7a8');
                                grad.addColorStop(1, '#687f82');
                            } else {
                                grad.addColorStop(0, '#477080');
                                grad.addColorStop(0.55, '#1b3e51');
                                grad.addColorStop(1, '#142b3d');
                            }
                            ctx.fillStyle = grad;
                            ctx.fillRect(x, y, w, h);
                            ctx.fillStyle = 'rgba(235,244,238,0.09)';
                            ctx.fillRect(x + 2, y + 2, 1.5, h - 4);
                        }
                    }
                    // Fine steel mullions and recessed floor joints.
                    ctx.fillStyle = 'rgba(15,29,40,0.78)';
                    for (let i = 0; i <= cols; i++) ctx.fillRect(i * (w + padX), 0, padX, 1024);
                    for (let y = 0; y < 1024; y += 43) {
                        ctx.fillStyle = 'rgba(8,19,29,0.34)';
                        ctx.fillRect(0, y, 512, 2);
                        ctx.fillStyle = 'rgba(211,231,224,0.12)';
                        ctx.fillRect(0, y + 2, 512, 1);
                    }
                    ctx.fillStyle = 'rgba(212,229,218,0.16)';
                    ctx.fillRect(14, 0, 2, 1024);
                    ctx.fillRect(497, 0, 3, 1024);
                } else if (style === 'kenyan_plaza') {
                    // Realistic Kenyan Town Commercial Building (Eldoret / Nakuru / Kisumu Plaza with Ground Shopfronts)
                    const plaster = ctx.createLinearGradient(0, 0, 512, 0);
                    plaster.addColorStop(0, '#aa9d87');
                    plaster.addColorStop(0.16, '#ded4c0');
                    plaster.addColorStop(0.82, '#d1c6b3');
                    plaster.addColorStop(1, '#918573');
                    ctx.fillStyle = plaster;
                    ctx.fillRect(0, 0, 512, 1024);

                    // Fine plaster variation and understated weathering around slab edges.
                    for (let i = 0; i < 5200; i++) {
                        const shade = Math.random() > 0.5 ? 255 : 78;
                        ctx.fillStyle = `rgba(${shade},${shade === 255 ? 246 : 68},${shade === 255 ? 230 : 52},${Math.random() * 0.035})`;
                        ctx.fillRect(Math.random() * 512, Math.random() * 1024, 1 + Math.random() * 2, 1 + Math.random() * 3);
                    }

                    // Horizontal concrete floor slabs & balconies
                    for (let y = 80; y < 860; y += 130) {
                        const slab = ctx.createLinearGradient(0, y, 0, y + 22);
                        slab.addColorStop(0, '#f0e8d9');
                        slab.addColorStop(0.18, '#a79a85');
                        slab.addColorStop(1, '#7e7466');
                        ctx.fillStyle = slab;
                        ctx.fillRect(0, y, 512, 20);
                        ctx.fillStyle = 'rgba(32,31,27,0.23)';
                        ctx.fillRect(0, y + 20, 512, 5);
                        // Deep window reveals, reflective panes, sills and narrow metal mullions.
                        for (let x = 24; x < 470; x += 96) {
                            ctx.fillStyle = '#665f55';
                            ctx.fillRect(x - 4, y + 27, 80, 87);
                            const pane = ctx.createLinearGradient(x, y + 28, x + 72, y + 110);
                            pane.addColorStop(0, '#80989a');
                            pane.addColorStop(0.36, '#334e59');
                            pane.addColorStop(0.7, '#182b36');
                            pane.addColorStop(1, '#587077');
                            ctx.fillStyle = pane;
                            ctx.fillRect(x, y + 29, 72, 79);
                            ctx.fillStyle = 'rgba(230,235,218,0.2)';
                            ctx.beginPath();
                            ctx.moveTo(x + 5, y + 32);
                            ctx.lineTo(x + 24, y + 32);
                            ctx.lineTo(x + 8, y + 103);
                            ctx.lineTo(x + 4, y + 103);
                            ctx.fill();
                            ctx.fillStyle = 'rgba(12,24,31,0.78)';
                            ctx.fillRect(x + 35, y + 29, 2, 79);
                            ctx.fillStyle = '#e2d6c1';
                            ctx.fillRect(x - 3, y + 108, 78, 6);
                        }
                    }

                    // Corner piers and a restrained roof parapet give the block a crisp silhouette.
                    const pier = ctx.createLinearGradient(0, 0, 15, 0);
                    pier.addColorStop(0, 'rgba(80,70,58,0.38)');
                    pier.addColorStop(0.45, 'rgba(248,239,220,0.42)');
                    pier.addColorStop(1, 'rgba(90,80,68,0.22)');
                    ctx.fillStyle = pier;
                    ctx.fillRect(0, 0, 17, 875);
                    ctx.fillRect(495, 0, 17, 875);
                    ctx.fillStyle = '#877c6c';
                    ctx.fillRect(0, 52, 512, 18);
                    ctx.fillStyle = 'rgba(255,246,222,0.46)';
                    ctx.fillRect(0, 50, 512, 3);

                    // Ground Floor Kenyan Retail Shopfronts (Supermarket / Pharmacy / Bank)
                    ctx.fillStyle = '#065f46';
                    ctx.fillRect(0, 860, 512, 46);
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 24px Rajdhani, sans-serif';
                    ctx.fillText('COMMERCIAL', 28, 891);

                    const shopGlass = ctx.createLinearGradient(0, 912, 0, 1016);
                    shopGlass.addColorStop(0, '#3f5d62');
                    shopGlass.addColorStop(0.5, '#172e38');
                    shopGlass.addColorStop(1, '#0c1c25');
                    ctx.fillStyle = shopGlass;
                    ctx.fillRect(18, 912, 476, 104);
                    ctx.fillStyle = 'rgba(223,233,218,0.42)';
                    ctx.fillRect(26, 920, 3, 82);
                    for (let x = 145; x < 494; x += 116) {
                        ctx.fillStyle = 'rgba(9,20,25,0.85)';
                        ctx.fillRect(x, 912, 5, 104);
                    }
                } else {
                    // Mombasa Swahili Coral-Stone & Arched Facade
                    const coral = ctx.createLinearGradient(0, 0, 512, 0);
                    coral.addColorStop(0, '#b8a993');
                    coral.addColorStop(0.18, '#e7ddc9');
                    coral.addColorStop(0.86, '#dbceb8');
                    coral.addColorStop(1, '#9c8d77');
                    ctx.fillStyle = coral;
                    ctx.fillRect(0, 0, 512, 1024);
                    for (let i = 0; i < 3400; i++) {
                        ctx.fillStyle = `rgba(73,58,40,${Math.random() * 0.045})`;
                        ctx.fillRect(Math.random() * 512, Math.random() * 1024, 1 + Math.random() * 2, 1 + Math.random() * 2);
                    }
                    ctx.fillStyle = '#e8e0d1';
                    ctx.fillRect(0, 36, 512, 12);
                    ctx.fillStyle = '#64837c';
                    ctx.fillRect(0, 0, 512, 34);
                    for (let y = 90; y < 940; y += 170) {
                        for (let x = 32; x < 460; x += 155) {
                            ctx.fillStyle = 'rgba(72,61,48,0.65)';
                            ctx.beginPath();
                            ctx.arc(x + 55, y + 50, 53, Math.PI, 0);
                            ctx.lineTo(x + 108, y + 132);
                            ctx.lineTo(x + 2, y + 132);
                            ctx.closePath();
                            ctx.fill();
                            const archGlass = ctx.createLinearGradient(x, y + 28, x + 108, y + 130);
                            archGlass.addColorStop(0, '#778e8d');
                            archGlass.addColorStop(0.45, '#263b3d');
                            archGlass.addColorStop(1, '#111d21');
                            ctx.fillStyle = archGlass;
                            ctx.beginPath();
                            ctx.arc(x + 55, y + 50, 46, Math.PI, 0);
                            ctx.lineTo(x + 101, y + 126);
                            ctx.lineTo(x + 9, y + 126);
                            ctx.closePath();
                            ctx.fill();
                            ctx.fillStyle = 'rgba(237,225,197,0.42)';
                            ctx.fillRect(x + 52, y + 50, 4, 77);
                            ctx.fillRect(x + 8, y + 126, 94, 5);
                        }
                    }
                    ctx.fillStyle = 'rgba(86,74,57,0.18)';
                    for (let y = 255; y < 1000; y += 170) ctx.fillRect(0, y, 512, 5);
                }

                const tex = new THREE.CanvasTexture(c);
                tex.encoding = THREE.sRGBEncoding;
                tex.anisotropy = 8;
                return tex;
            }

            // Realistic Kenyan Logistics Container Livery
            function createContainerTexture() {
                const c = document.createElement('canvas');
                c.width = 1024;
                c.height = 512;
                const ctx = c.getContext('2d');

                // Subtle painted aluminum with restrained panel and light falloff.
                const base = ctx.createLinearGradient(0, 0, 0, 512);
                base.addColorStop(0, '#f2f2ef');
                base.addColorStop(0.72, '#e5e6e3');
                base.addColorStop(1, '#cfd2d0');
                ctx.fillStyle = base;
                ctx.fillRect(0, 0, 1024, 512);

                // Fine trailer ribs, panel seams and soft painted-metal highlights.
                for (let x = 0; x < 1024; x += 18) {
                    ctx.fillStyle = x % 36 === 0 ? 'rgba(40,48,52,0.045)' : 'rgba(255,255,255,0.18)';
                    ctx.fillRect(x, 0, 7, 512);
                }
                ctx.strokeStyle = 'rgba(70,80,82,0.16)';
                ctx.lineWidth = 2;
                ctx.strokeRect(18, 18, 988, 476);
                ctx.strokeStyle = 'rgba(255,255,255,0.55)';
                ctx.beginPath(); ctx.moveTo(20, 50); ctx.lineTo(1004, 50); ctx.stroke();

                // Small fleet marking and realistic red/white reflective safety tape.
                ctx.fillStyle = '#24343a';
                ctx.font = '700 30px Rajdhani, sans-serif';
                ctx.fillText('KENYA FREIGHT', 62, 108);
                ctx.fillStyle = '#64716e';
                ctx.font = '500 15px JetBrains Mono, monospace';
                ctx.fillText('A104  •  NAIROBI / NAKURU / ELDORET', 64, 134);
                ctx.fillStyle = '#b91c1c';
                ctx.fillRect(0, 474, 1024, 12);
                for (let x = 0; x < 1024; x += 64) {
                    ctx.fillStyle = '#f8fafc';
                    ctx.fillRect(x, 474, 28, 12);
                }

                const tex = new THREE.CanvasTexture(c);
                tex.encoding = THREE.sRGBEncoding;
                tex.anisotropy = 12;
                return tex;
            }

            // Realistic Green KeNHA Overhead Highway Signboard
            function createRoadSignTexture(countyName, hwyCode, townName) {
                const c = document.createElement('canvas');
                c.width = 1024;
                c.height = 256;
                const ctx = c.getContext('2d');

                ctx.fillStyle = '#005a32'; // Authentic Kenyan Highway Sign Green
                ctx.fillRect(0, 0, 1024, 256);

                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 10;
                ctx.strokeRect(10, 10, 1004, 236);

                // Yellow Highway Route Badge
                ctx.fillStyle = '#facc15';
                ctx.fillRect(36, 46, 175, 164);
                ctx.fillStyle = '#0f172a';
                ctx.font = '900 52px Orbitron, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(hwyCode, 123, 146);

                ctx.textAlign = 'left';
                ctx.fillStyle = '#ffffff';
                ctx.font = '900 44px Orbitron, sans-serif';
                ctx.fillText(`${countyName.toUpperCase()} COUNTY`, 245, 112);

                ctx.fillStyle = '#fde047';
                ctx.font = '700 32px Rajdhani, sans-serif';
                ctx.fillText(`${townName.toUpperCase()}  |  SPEED LIMIT 80 KM/H`, 245, 178);

                const tex = new THREE.CanvasTexture(c);
                tex.encoding = THREE.sRGBEncoding;
                tex.anisotropy = 8;
                return tex;
            }

            return { createAsphaltTexture, createBuildingFacadeTexture, createContainerTexture, createRoadSignTexture };
        })();

        /**
         * 4. PHOTOREALISTIC 3D SCENE, VEHICLES, BUILDINGS & 360° ORBIT ENGINE
         */
        const Sim = (() => {
            let scene, camera, renderer, envMap;
            let truckRoot, cabGroup, trailerGroup, interiorWheel;
            let roadMesh, roadTex, groundMesh, skyDome;
            let buildingsAndProps = [];
            let gantries = [];
            let trafficCars = []; // Detailed 3D SUVs, Sedans & Matatus
            let pedestrianCrossings = [];
            let routeFeatures = [];
            let journeyFeatures = [];
            let journeyPeople = [];
            let journeyWaterRipples = [];
            let checkpointBeacons = [];
            let rollingWheels = [];
            let leftBeam, rightBeam, brakeLightMeshes = [];

            const state = {
                speed: 0,
                x: 3.4,
                steerAngle: 0,
                trailerYaw: 0,
                cameraMode: 0,        // 0: CHASE, 1: 360° ORBIT, 2: COCKPIT, 3: HOOD
                orbitTargetIdx: 0,    // 0: Semi-Truck, 1+: Traffic SUV/Car
                orbitYaw: 2.7,
                orbitPitch: 0.22,
                orbitDist: 13.5,
                weatherMode: 0,       // 0: Daylight, 1: Golden Dusk, 2: Nairobi Night
                headlightsOn: true,
                laneAssist: false,
                activeCorridor: KENYA_NETWORK.corridors[0],
                countyIdx: 0,
                distTraveled: 0,
                totalDist: 312,
                cargoHealth: 100,
                trafficSignal: 'GREEN'
            };

            const inputs = { gas: false, brake: false, left: false, right: false };
            const CAM_NAMES = ['CHASE', '360° ORBIT', 'COCKPIT', 'HOOD'];

            function init() {
                const canvas = document.getElementById('game-canvas');
                scene = new THREE.Scene();

                camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.2, 480);

                renderer = new THREE.WebGLRenderer({
                    canvas,
                    antialias: (window.devicePixelRatio || 1) < 1.5,
                    powerPreference: 'high-performance'
                });
                clarityCap = 1.5;
                applyRenderScale();
                renderer.outputEncoding = THREE.sRGBEncoding;
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 1.12;
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;

                generateEnvironmentReflections();
                setupLights();
                buildKenyanWorld();
                buildRealisticSemiTruck();
                buildTrafficCars();
                setupOrbitGestures(canvas);

                window.addEventListener('resize', onResize);
                document.addEventListener('visibilitychange', () => {
                    physicsAccumulator = 0;
                    lastFrame = 0;
                    fpsWindowStart = 0;
                    fpsWindowFrames = 0;
                });
                renderer.setAnimationLoop(loop);
            }

            // Procedural Studio/Sky Environment Reflection Map for Realistic Metallic Paint & Glass
            function generateEnvironmentReflections() {
                const pmrem = new THREE.PMREMGenerator(renderer);
                const envScene = new THREE.Scene();
                const skyDome = new THREE.Mesh(
                    new THREE.SphereGeometry(50, 24, 16),
                    new THREE.MeshBasicMaterial({ color: 0x7dd3fc, side: THREE.BackSide })
                );
                const groundDome = new THREE.Mesh(
                    new THREE.PlaneGeometry(100, 100),
                    new THREE.MeshBasicMaterial({ color: 0x3f2e21 })
                );
                groundDome.rotation.x = -Math.PI / 2;
                groundDome.position.y = -5;
                envScene.add(skyDome, groundDome);
                envMap = pmrem.fromScene(envScene).texture;
                scene.environment = envMap;
                pmrem.dispose();
            }

            let hemiLight, sunLight;
            function setupLights() {
                hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x3b2f24, 0.95);
                scene.add(hemiLight);

                sunLight = new THREE.DirectionalLight(0xfffbeb, 1.65);
                sunLight.position.set(55, 95, 45);
                sunLight.castShadow = true;
                sunLight.shadow.mapSize.width = 1024;
                sunLight.shadow.mapSize.height = 1024;
                sunLight.shadow.camera.near = 10;
                sunLight.shadow.camera.far = 220;
                const d = 45;
                sunLight.shadow.camera.left = -d;
                sunLight.shadow.camera.right = d;
                sunLight.shadow.camera.top = d;
                sunLight.shadow.camera.bottom = -d;
                scene.add(sunLight);

                scene.background = new THREE.Color(0x6ba4d9);
                scene.fog = new THREE.FogExp2(0x8ab8e0, 0.0032);

                const skyCanvas = document.createElement('canvas');
                skyCanvas.width = 1024;
                skyCanvas.height = 512;
                const skyCtx = skyCanvas.getContext('2d');
                const skyGradient = skyCtx.createLinearGradient(0, 0, 0, 512);
                skyGradient.addColorStop(0, '#5e9fce');
                skyGradient.addColorStop(0.48, '#a7cce3');
                skyGradient.addColorStop(0.78, '#d4e4e8');
                skyGradient.addColorStop(1, '#e8e6da');
                skyCtx.fillStyle = skyGradient;
                skyCtx.fillRect(0, 0, 1024, 512);
                for (let i = 0; i < 14; i++) {
                    const x = (i * 89 + 41) % 1024;
                    const y = 115 + ((i * 37) % 155);
                    const width = 70 + ((i * 29) % 130);
                    const cloud = skyCtx.createRadialGradient(x, y, 2, x, y, width);
                    cloud.addColorStop(0, 'rgba(255,255,255,0.2)');
                    cloud.addColorStop(1, 'rgba(255,255,255,0)');
                    skyCtx.fillStyle = cloud;
                    skyCtx.fillRect(x - width, y - width * 0.35, width * 2, width * 0.7);
                }
                const skyTexture = new THREE.CanvasTexture(skyCanvas);
                skyTexture.encoding = THREE.sRGBEncoding;
                skyDome = new THREE.Mesh(
                    new THREE.SphereGeometry(440, 32, 20),
                    new THREE.MeshBasicMaterial({ map: skyTexture, side: THREE.BackSide, fog: false, depthWrite: false })
                );
                skyDome.frustumCulled = false;
                scene.add(skyDome);
            }

            function buildKenyanWorld() {
                // Kenyan Highland / Savannah Terrain
                groundMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(1000, 1000),
                    new THREE.MeshStandardMaterial({ color: 0x2d4c2b, roughness: 0.92 })
                );
                groundMesh.rotation.x = -Math.PI / 2;
                groundMesh.position.y = -0.05;
                groundMesh.receiveShadow = true;
                scene.add(groundMesh);

                // Realistic 4-Lane Kenyan Tarmac Highway (Width 26m)
                roadTex = RealismAssets.createAsphaltTexture();
                roadTex.repeat.set(1, 24);
                roadMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(26, 750),
                    new THREE.MeshStandardMaterial({ map: roadTex, roughness: 0.58, metalness: 0.08 })
                );
                roadMesh.rotation.x = -Math.PI / 2;
                roadMesh.position.z = -260;
                roadMesh.receiveShadow = true;
                scene.add(roadMesh);

                // Concrete Highway Side Curbs & Steel Guardrails
                const curbMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.7 });
                const leftCurb = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 750), curbMat);
                leftCurb.position.set(-13.4, 0.12, -260);
                const rightCurb = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.25, 750), curbMat);
                rightCurb.position.set(13.4, 0.12, -260);
                scene.add(leftCurb, rightCurb);

                // Soft highland ridges add distance and scale behind the roadside town details.
                const hillColors = [0x61704e, 0x74775a, 0x59694d, 0x847b60];
                for (let i = 0; i < 12; i++) {
                    const side = i % 2 === 0 ? -1 : 1;
                    const hill = new THREE.Mesh(
                        new THREE.SphereGeometry(1, 22, 14),
                        new THREE.MeshStandardMaterial({ color: hillColors[i % hillColors.length], roughness: 1, metalness: 0 })
                    );
                    hill.scale.set(25 + (i % 4) * 8, 9 + (i % 3) * 4, 48 + (i % 5) * 9);
                    hill.position.set(side * (63 + (i % 3) * 11), -3.5, -30 - i * 54);
                    hill.receiveShadow = true;
                    scene.add(hill);
                    buildingsAndProps.push(hill);
                }

                // Realistic Kenyan Architectural Buildings, Petrol Stations & Acacia/Eucalyptus Trees
                const glassTex = RealismAssets.createBuildingFacadeTexture('glass_tower');
                const plazaTex = RealismAssets.createBuildingFacadeTexture('kenyan_plaza');
                const coastalTex = RealismAssets.createBuildingFacadeTexture('coastal');

                const facadeMats = [
                    new THREE.MeshStandardMaterial({ map: glassTex, roughness: 0.3, metalness: 0.28 }),
                    new THREE.MeshStandardMaterial({ map: plazaTex, roughness: 0.78, metalness: 0.02 }),
                    new THREE.MeshStandardMaterial({ map: coastalTex, roughness: 0.86, metalness: 0.01 })
                ];
                const facadeTrimMat = new THREE.MeshStandardMaterial({ color: 0xa6aaa2, roughness: 0.68, metalness: 0.18 });
                const roofServiceMat = new THREE.MeshStandardMaterial({ color: 0x888c83, roughness: 0.9, metalness: 0.04 });

                for (let i = 0; i < 42; i++) {
                    const zPos = -i * 16;
                    [-1, 1].forEach(side => {
                        const group = new THREE.Group();
                        const distFromRoad = 19 + (i % 3) * 11 + Math.random() * 6;
                        group.position.set(side * distFromRoad, 0, zPos);

                        if (i % 7 === 0 && side === 1) {
                            // Realistic Kenyan Highway Petrol Station Canopy (Total / Rubis Style)
                            const canopy = new THREE.Mesh(
                                new THREE.BoxGeometry(10, 0.8, 14),
                                new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 })
                            );
                            canopy.position.y = 5.4;
                            const roofTrim = new THREE.Mesh(
                                new THREE.BoxGeometry(10.2, 0.25, 14.2),
                                new THREE.MeshBasicMaterial({ color: 0xfacc15 })
                            );
                            roofTrim.position.y = 5.85;
                            const pillar1 = new THREE.Mesh(new THREE.BoxGeometry(0.6, 5.4, 0.6), new THREE.MeshStandardMaterial({ color: 0xf8fafc }));
                            pillar1.position.set(-3.5, 2.7, -4);
                            const pillar2 = pillar1.clone();
                            pillar2.position.set(-3.5, 2.7, 4);
                            group.add(canopy, roofTrim, pillar1, pillar2);
                        } else if (i % 2 === 0) {
                            // Multi-Story Realistic Kenyan Building
                            const isTower = (i % 6 === 0);
                            const w = isTower ? 11 : 12;
                            const d = isTower ? 11 : 14;
                            const h = isTower ? (26 + Math.random() * 24) : (10 + Math.random() * 10);
                            const mat = isTower ? facadeMats[0] : facadeMats[1];
                            const bldg = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
                            bldg.position.y = h / 2;
                            bldg.castShadow = true;
                            bldg.receiveShadow = true;

                            // Clean slab cap, roof plant and water storage make the skyline read as built space.
                            const roofCap = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.32, d + 0.3), facadeTrimMat);
                            roofCap.position.y = h + 0.1;
                            const plantRoom = new THREE.Mesh(
                                new THREE.BoxGeometry(w * (isTower ? 0.3 : 0.38), isTower ? 1.8 : 1.1, d * 0.3),
                                roofServiceMat
                            );
                            plantRoom.position.set(-w * 0.18, h + (isTower ? 1.2 : 0.85), -d * 0.16);

                            // Towers use restrained vertical fins and a rooftop louver enclosure for scale.
                            if (isTower) {
                                const finGeometry = new THREE.BoxGeometry(0.24, h + 0.15, 0.36);
                                const leftFin = new THREE.Mesh(finGeometry, facadeTrimMat);
                                leftFin.position.set(-w * 0.43, h / 2, d / 2 + 0.08);
                                const rightFin = new THREE.Mesh(finGeometry, facadeTrimMat);
                                rightFin.position.set(w * 0.43, h / 2, d / 2 + 0.08);
                                const louver = new THREE.Mesh(new THREE.BoxGeometry(w * 0.24, 1.3, 0.16), roofServiceMat);
                                louver.position.set(w * 0.16, h - 1.1, d / 2 + 0.1);
                                group.add(leftFin, rightFin, louver);
                            }

                            // Roof water tank and service volume are common details on Kenyan town buildings.
                            const tank = new THREE.Mesh(
                                new THREE.CylinderGeometry(1.05, 1.05, 2.1, 16),
                                new THREE.MeshStandardMaterial({ color: 0x29383a, roughness: 0.62, metalness: 0.12 })
                            );
                            tank.position.set(w * 0.27, h + 1.36, d * 0.22);
                            const roofVent = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.7, 1.4), roofServiceMat);
                            roofVent.position.set(w * 0.34, h + 0.5, -d * 0.28);
                            group.add(bldg, roofCap, plantRoom, tank, roofVent);
                        } else {
                            // Realistic East African Acacia / Highland Tree + Highway Streetlight
                            const trunk = new THREE.Mesh(
                                new THREE.CylinderGeometry(0.25, 0.4, 4.2, 8),
                                new THREE.MeshStandardMaterial({ color: 0x4a3525, roughness: 0.9 })
                            );
                            trunk.position.y = 2.1;
                            const crown = new THREE.Mesh(
                                new THREE.CylinderGeometry(3.8, 1.8, 1.6, 12),
                                new THREE.MeshStandardMaterial({ color: 0x2d5a27, roughness: 0.85 })
                            );
                            crown.position.y = 4.5;
                            group.add(trunk, crown);
                        }

                        // Streetlight pole along curb
                        const pole = new THREE.Mesh(
                            new THREE.CylinderGeometry(0.1, 0.14, 8.5, 8),
                            new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 })
                        );
                        pole.position.set(-side * (distFromRoad - 14.2), 4.25, 0);
                        group.add(pole);

                        scene.add(group);
                        buildingsAndProps.push(group);
                    });
                }

                // Overhead Green KeNHA Highway Gantry Signs
                for (let i = 0; i < 3; i++) {
                    createHighwayGantry(-130 - i * 200);
                }

                buildPedestrianCrossings();
                buildRoundaboutJunction();
                buildJourneyScenery();
            }

            function createHighwayGantry(zPos) {
                const g = new THREE.Group();
                g.position.set(0, 0, zPos);

                const steelMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.25 });
                const pL = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.38, 10, 10), steelMat);
                pL.position.set(-13.8, 5, 0);
                const pR = pL.clone();
                pR.position.set(13.8, 5, 0);
                const truss = new THREE.Mesh(new THREE.BoxGeometry(28.4, 0.65, 0.65), steelMat);
                truss.position.set(0, 9.8, 0);

                const cObj = getCurrentCounty();
                const signTex = RealismAssets.createRoadSignTexture(cObj.name, cObj.hwy, cObj.town);
                const board = new THREE.Mesh(
                    new THREE.BoxGeometry(13.5, 3.4, 0.2),
                    new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.35 })
                );
                board.position.set(0, 8.4, 0.35);

                g.add(pL, pR, truss, board);
                g.userData = { board };
                scene.add(g);
                gantries.push(g);
            }

            function createPedestrian() {
                const person = new THREE.Group();
                const skin = new THREE.MeshStandardMaterial({ color: 0x8d5524, roughness: 0.88 });
                const shirtColors = [0x15803d, 0x1d4ed8, 0xb45309, 0x7c3aed];
                const shirt = new THREE.MeshStandardMaterial({ color: shirtColors[Math.floor(Math.random() * shirtColors.length)], roughness: 0.82 });
                const trousers = new THREE.MeshStandardMaterial({ color: 0x172033, roughness: 0.9 });
                const shoes = new THREE.MeshStandardMaterial({ color: 0x171717, roughness: 0.95 });

                const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.25, 0.64, 10), shirt);
                torso.position.y = 1.05;
                torso.castShadow = true;
                person.add(torso);

                const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.085, 0.16, 8), skin);
                neck.position.y = 1.43;
                const head = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), skin);
                head.position.y = 1.62;
                head.castShadow = true;
                const hair = new THREE.Mesh(new THREE.SphereGeometry(0.175, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), new THREE.MeshStandardMaterial({ color: 0x17120f, roughness: 1 }));
                hair.position.y = 1.66;
                person.add(neck, head, hair);

                const makeLimb = (material, length, radius) => {
                    const limb = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.78, radius, length, 8), material);
                    limb.castShadow = true;
                    return limb;
                };
                const leftArm = makeLimb(skin, 0.55, 0.075);
                const rightArm = makeLimb(skin, 0.55, 0.075);
                leftArm.position.set(-0.29, 1.08, 0);
                rightArm.position.set(0.29, 1.08, 0);
                const leftLeg = makeLimb(trousers, 0.68, 0.105);
                const rightLeg = makeLimb(trousers, 0.68, 0.105);
                leftLeg.position.set(-0.13, 0.39, 0);
                rightLeg.position.set(0.13, 0.39, 0);
                const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.28), shoes);
                const rightShoe = leftShoe.clone();
                leftShoe.position.set(-0.13, 0.08, -0.06);
                rightShoe.position.set(0.13, 0.08, -0.06);
                person.add(leftArm, rightArm, leftLeg, rightLeg, leftShoe, rightShoe);

                person.userData = { leftArm, rightArm, leftLeg, rightLeg, startZ: 0 };
                return person;
            }

            function createCrossingSignTexture() {
                const canvas = document.createElement('canvas');
                canvas.width = 256;
                canvas.height = 256;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#facc15';
                ctx.beginPath();
                ctx.moveTo(128, 8); ctx.lineTo(248, 128); ctx.lineTo(128, 248); ctx.lineTo(8, 128); ctx.closePath();
                ctx.fill();
                ctx.strokeStyle = '#1f2937'; ctx.lineWidth = 9; ctx.stroke();
                ctx.fillStyle = '#172033';
                ctx.beginPath(); ctx.arc(135, 72, 18, 0, Math.PI * 2); ctx.fill();
                ctx.lineWidth = 13; ctx.lineCap = 'round'; ctx.strokeStyle = '#172033';
                ctx.beginPath(); ctx.moveTo(130, 95); ctx.lineTo(112, 147); ctx.lineTo(153, 158); ctx.lineTo(171, 202); ctx.moveTo(114, 142); ctx.lineTo(82, 176); ctx.moveTo(130, 108); ctx.lineTo(172, 128); ctx.stroke();
                ctx.lineWidth = 11;
                ctx.beginPath(); ctx.moveTo(114, 147); ctx.lineTo(98, 205); ctx.moveTo(153, 158); ctx.lineTo(137, 208); ctx.stroke();
                const tex = new THREE.CanvasTexture(canvas);
                tex.encoding = THREE.sRGBEncoding;
                return tex;
            }

            function addSignalHead(parent, x, y, z, facing) {
                const headGroup = new THREE.Group();
                headGroup.position.set(x, y, z);
                headGroup.rotation.y = facing;
                const housingMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.42, metalness: 0.35 });
                const housing = new THREE.Mesh(new THREE.BoxGeometry(0.62, 1.72, 0.42), housingMat);
                housing.castShadow = true;
                headGroup.add(housing);
                const lampDefs = [
                    { key: 'RED', y: 0.5, color: 0xef4444 },
                    { key: 'AMBER', y: 0, color: 0xf59e0b },
                    { key: 'GREEN', y: -0.5, color: 0x22c55e }
                ];
                const lamps = {};
                lampDefs.forEach(def => {
                    const material = new THREE.MeshStandardMaterial({
                        color: def.color,
                        emissive: def.color,
                        emissiveIntensity: 0.035,
                        roughness: 0.24,
                        metalness: 0.05
                    });
                    const lens = new THREE.Mesh(new THREE.SphereGeometry(0.17, 16, 12), material);
                    lens.position.set(0, def.y, 0.235);
                    headGroup.add(lens);
                    lamps[def.key] = lens;
                });
                parent.add(headGroup);
                return lamps;
            }

            function buildPedestrianCrossings() {
                const stripeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.78, metalness: 0.02 });
                const stopLineMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.8 });
                const poleMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5, metalness: 0.75 });
                const signTex = createCrossingSignTexture();
                const signMat = new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.62, metalness: 0.02, side: THREE.DoubleSide });

                [-78, -300, -522].forEach((zPos, index) => {
                    const crossing = new THREE.Group();
                    crossing.position.z = zPos;

                    // Broad zebra bars and a stop line make each town crossing visible from the cab.
                    for (let i = 0; i < 5; i++) {
                        const stripe = new THREE.Mesh(new THREE.BoxGeometry(24.2, 0.035, 0.58), stripeMat);
                        stripe.position.set(0, 0.018, -1.45 + i * 0.98);
                        stripe.receiveShadow = true;
                        crossing.add(stripe);
                    }
                    const stopLine = new THREE.Mesh(new THREE.BoxGeometry(24.2, 0.035, 0.22), stopLineMat);
                    stopLine.position.set(0, 0.02, 5.9);
                    crossing.add(stopLine);

                    const lamps = [];
                    [-12.7, 12.7].forEach(sideX => {
                        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.17, 5.5, 10), poleMat);
                        pole.position.set(sideX, 2.75, 7.1);
                        pole.castShadow = true;
                        crossing.add(pole);
                        const arm = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.14, 0.14), poleMat);
                        arm.position.set(sideX, 5.15, 7.1);
                        crossing.add(arm);
                        // Double-sided signal heads serve both directions of the divided highway.
                        lamps.push(addSignalHead(crossing, sideX, 5.55, 7.1, 0));
                        lamps.push(addSignalHead(crossing, sideX, 5.55, 6.72, Math.PI));

                        const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.07, 2.5, 8), poleMat);
                        signPost.position.set(sideX * 0.94, 1.25, 3.8);
                        crossing.add(signPost);
                        const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.88, 0.88), signMat);
                        sign.position.set(sideX * 0.94, 2.72, 3.8);
                        crossing.add(sign);
                    });

                    const walkers = [];
                    for (let i = 0; i < 3; i++) {
                        const person = createPedestrian();
                        person.position.set(-14.1, 0, -1.35 + i * 1.35);
                        person.visible = false;
                        crossing.add(person);
                        walkers.push(person);
                    }

                    crossing.userData = { lamps, walkers, phaseOffset: index * 9 };
                    scene.add(crossing);
                    pedestrianCrossings.push(crossing);
                });
            }

            function createRoadRibbon(parent, points, width, material) {
                const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0.035, z)));
                const samples = curve.getPoints(48);
                const vertices = [];
                const indices = [];
                samples.forEach((point, i) => {
                    const before = samples[Math.max(0, i - 1)];
                    const after = samples[Math.min(samples.length - 1, i + 1)];
                    const dx = after.x - before.x;
                    const dz = after.z - before.z;
                    const length = Math.hypot(dx, dz) || 1;
                    const nx = -dz / length * width * 0.5;
                    const nz = dx / length * width * 0.5;
                    vertices.push(point.x + nx, point.y, point.z + nz, point.x - nx, point.y, point.z - nz);
                    if (i < samples.length - 1) {
                        const n = i * 2;
                        indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
                    }
                });
                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
                geometry.setIndex(indices);
                geometry.computeVertexNormals();
                const mesh = new THREE.Mesh(geometry, material);
                mesh.receiveShadow = true;
                parent.add(mesh);
                return mesh;
            }

            function buildRoundaboutJunction() {
                const junction = new THREE.Group();
                junction.position.set(0, 0, -235);
                const asphalt = new THREE.MeshStandardMaterial({ color: 0x252b2e, roughness: 0.84, metalness: 0.04 });
                const paint = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.76 });
                const curb = new THREE.MeshStandardMaterial({ color: 0xd6d3c9, roughness: 0.8 });
                const grass = new THREE.MeshStandardMaterial({ color: 0x3e7135, roughness: 0.94 });
                const centerX = 23;

                // A compact Kenyan highway exit with two curved approach lanes.
                const branches = [
                    [[12.4, 13], [15.1, 10.5], [17.6, 7.8], [20.1, 4.8]],
                    [[20.1, -4.8], [17.6, -7.8], [15.1, -10.5], [12.4, -13]],
                    [[27, -9.1], [30, -12.5], [35, -14.2], [41, -14.2]]
                ];
                branches.forEach(points => {
                    createRoadRibbon(junction, points, 7.2, asphalt);
                    [-3.35, 3.35].forEach(offset => {
                        const shifted = points.map(([x, z], i) => {
                            const next = points[Math.min(points.length - 1, i + 1)];
                            const prev = points[Math.max(0, i - 1)];
                            const dx = next[0] - prev[0], dz = next[1] - prev[1], len = Math.hypot(dx, dz) || 1;
                            return [x - dz / len * offset, z + dx / len * offset];
                        });
                        createRoadRibbon(junction, shifted, 0.16, paint);
                    });
                });

                // Circulating lane, raised central island, and painted yield bars.
                const ring = new THREE.Mesh(new THREE.RingGeometry(5.25, 9.1, 96), asphalt);
                ring.rotation.x = -Math.PI / 2;
                ring.position.set(centerX, 0.045, 0);
                ring.receiveShadow = true;
                junction.add(ring);
                const island = new THREE.Mesh(new THREE.CylinderGeometry(5.15, 5.45, 0.38, 64), curb);
                island.position.set(centerX, 0.19, 0);
                island.castShadow = true;
                island.receiveShadow = true;
                junction.add(island);
                const islandTop = new THREE.Mesh(new THREE.CircleGeometry(5.05, 64), grass);
                islandTop.rotation.x = -Math.PI / 2;
                islandTop.position.set(centerX, 0.395, 0);
                junction.add(islandTop);

                const treeMat = new THREE.MeshStandardMaterial({ color: 0x28613a, roughness: 0.9 });
                const trunkMat = new THREE.MeshStandardMaterial({ color: 0x76513a, roughness: 0.95 });
                [[-1.7, -1.2], [1.8, 1.45], [-0.4, 2.55]].forEach(([x, z], i) => {
                    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.2, 1.1, 8), trunkMat);
                    trunk.position.set(centerX + x, 0.95, z);
                    const crown = new THREE.Mesh(new THREE.SphereGeometry(0.95 + i * 0.08, 12, 9), treeMat);
                    crown.position.set(centerX + x, 1.85, z);
                    crown.castShadow = true;
                    junction.add(trunk, crown);
                });

                // Reflective direction boards and chevrons make the turn readable at speed.
                const signMat = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.55, metalness: 0.12 });
                const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 2.6, 8), curb);
                signPost.position.set(13.1, 1.3, 16.2);
                const signBoard = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.92, 0.12), signMat);
                signBoard.position.set(13.1, 2.55, 16.2);
                const signCanvas = document.createElement('canvas');
                signCanvas.width = 512;
                signCanvas.height = 160;
                const signCtx = signCanvas.getContext('2d');
                signCtx.fillStyle = '#14532d';
                signCtx.fillRect(0, 0, 512, 160);
                signCtx.strokeStyle = '#f8fafc';
                signCtx.lineWidth = 8;
                signCtx.strokeRect(8, 8, 496, 144);
                signCtx.fillStyle = '#f8fafc';
                signCtx.font = 'bold 48px Arial';
                signCtx.textAlign = 'center';
                signCtx.fillText('ROUNDABOUT', 256, 66);
                signCtx.font = 'bold 34px Arial';
                signCtx.fillText('SLOW  •  GIVE WAY', 256, 116);
                const signTexture = new THREE.CanvasTexture(signCanvas);
                signTexture.encoding = THREE.sRGBEncoding;
                const signText = new THREE.Mesh(new THREE.PlaneGeometry(2.45, 0.76), new THREE.MeshBasicMaterial({ map: signTexture, side: THREE.DoubleSide }));
                signText.position.set(13.1, 2.55, 16.27);
                junction.add(signPost, signBoard, signText);
                [-2.2, 0, 2.2].forEach(z => {
                    const bar = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.035, 0.2), paint);
                    bar.position.set(12.7, 0.055, z + 10.5);
                    junction.add(bar);
                });
                for (let i = 0; i < 8; i++) {
                    const angle = Math.PI * 0.72 + i * 0.12;
                    const chevron = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.08, 0.34), paint);
                    chevron.position.set(centerX + Math.cos(angle) * 9.32, 0.08, Math.sin(angle) * 9.32);
                    chevron.rotation.y = -angle;
                    junction.add(chevron);
                }

                scene.add(junction);
                routeFeatures.push(junction);
            }

            function makeLandmarkBoard(parent, title, subtitle, x, y, z, width = 5.8) {
                const canvas = document.createElement('canvas');
                canvas.width = 768;
                canvas.height = 224;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#075232';
                ctx.fillRect(0, 0, 768, 224);
                ctx.strokeStyle = '#f8fafc';
                ctx.lineWidth = 10;
                ctx.strokeRect(8, 8, 752, 208);
                ctx.fillStyle = '#f8fafc';
                ctx.textAlign = 'center';
                ctx.font = 'bold 48px Arial';
                ctx.fillText(title.toUpperCase(), 384, 92, 720);
                ctx.fillStyle = '#facc15';
                ctx.font = 'bold 30px Arial';
                ctx.fillText(subtitle.toUpperCase(), 384, 158);
                const tex = new THREE.CanvasTexture(canvas);
                tex.encoding = THREE.sRGBEncoding;
                const board = new THREE.Mesh(
                    new THREE.PlaneGeometry(width, width * 0.292),
                    new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide })
                );
                board.position.set(x, y, z);
                parent.add(board);
                return board;
            }

            function addRouteTree(parent, x, z, color, scale = 1) {
                const tree = new THREE.Group();
                const trunk = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.2 * scale, 0.34 * scale, 3.7 * scale, 8),
                    new THREE.MeshStandardMaterial({ color: 0x60452e, roughness: 0.94 })
                );
                trunk.position.y = 1.85 * scale;
                const crownMat = new THREE.MeshStandardMaterial({ color, roughness: 0.92 });
                const crown = new THREE.Mesh(new THREE.SphereGeometry(1.9 * scale, 12, 9), crownMat);
                crown.scale.set(1.4, 0.56, 1.05);
                crown.position.y = 4.05 * scale;
                crown.castShadow = true;
                tree.add(trunk, crown);
                tree.position.set(x, 0, z);
                parent.add(tree);
            }

            function buildRiverBridge(parent, profile) {
                const bridge = new THREE.Group();
                bridge.position.z = -270;
                const water = new THREE.Mesh(
                    new THREE.PlaneGeometry(112, 26),
                    new THREE.MeshStandardMaterial({ color: profile.water, roughness: 0.18, metalness: 0.12, transparent: true, opacity: 0.94 })
                );
                water.rotation.x = -Math.PI / 2;
                water.position.y = -0.48;
                bridge.add(water);

                const bankMat = new THREE.MeshStandardMaterial({ color: profile.bank, roughness: 0.98 });
                [-15.4, 15.4].forEach(z => {
                    const bank = new THREE.Mesh(new THREE.BoxGeometry(112, 0.32, 5.2), bankMat);
                    bank.position.set(0, -0.12, z);
                    bank.receiveShadow = true;
                    bridge.add(bank);
                });

                // Concrete span and wearing surface sit just above the highway plane.
                const concrete = new THREE.Mesh(
                    new THREE.BoxGeometry(29.2, 0.24, 27.5),
                    new THREE.MeshStandardMaterial({ color: 0x858b8d, roughness: 0.83 })
                );
                concrete.position.set(0, -0.08, 0);
                concrete.receiveShadow = true;
                bridge.add(concrete);
                const deck = new THREE.Mesh(
                    new THREE.PlaneGeometry(26, 27),
                    new THREE.MeshStandardMaterial({ color: 0x30363a, roughness: 0.82 })
                );
                deck.rotation.x = -Math.PI / 2;
                deck.position.y = 0.046;
                bridge.add(deck);

                const railMat = new THREE.MeshStandardMaterial({ color: 0xc4c8c5, metalness: 0.6, roughness: 0.36 });
                [-14.25, 14.25].forEach(x => {
                    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.82, 27), railMat);
                    rail.position.set(x, 0.48, 0);
                    bridge.add(rail);
                    for (let z = -12; z <= 12; z += 4) {
                        const post = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.05, 0.24), railMat);
                        post.position.set(x, 0.44, z);
                        bridge.add(post);
                    }
                });
                const pierMat = new THREE.MeshStandardMaterial({ color: 0x777c79, roughness: 0.9 });
                [-12, 0, 12].forEach(x => {
                    const pier = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.0, 1.25), pierMat);
                    pier.position.set(x, -0.55, 0);
                    bridge.add(pier);
                });
                for (let i = 0; i < 18; i++) {
                    const ripple = new THREE.Mesh(
                        new THREE.BoxGeometry(1.8 + (i % 3) * 0.7, 0.012, 0.055),
                        new THREE.MeshBasicMaterial({ color: 0x9bd8dc, transparent: true, opacity: 0.22 })
                    );
                    ripple.position.set(-43 + (i * 13 % 86), -0.445, -9 + (i * 7 % 18));
                    bridge.add(ripple);
                    journeyWaterRipples.push({ mesh: ripple, x: ripple.position.x, z: ripple.position.z, phase: i * 0.73 });
                }
                makeLandmarkBoard(bridge, profile.river, 'BRIDGE · SLOW', 18.5, 4.1, 11.8, 6.6);
                const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 4.1, 8), railMat);
                post.position.set(18.5, 2.05, 11.8);
                bridge.add(post);
                parent.add(bridge);
            }

            function buildBusStage(parent, profile, routeId) {
                const stage = new THREE.Group();
                stage.position.z = -410;
                const concrete = new THREE.MeshStandardMaterial({ color: 0x9b9789, roughness: 0.9 });
                const darkMetal = new THREE.MeshStandardMaterial({ color: 0x38444a, metalness: 0.68, roughness: 0.36 });
                const roofMat = new THREE.MeshStandardMaterial({ color: 0x1d5b40, roughness: 0.62 });
                const platform = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.14, 8.5), concrete);
                platform.position.set(18.2, 0.06, 0);
                stage.add(platform);
                const roof = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.28, 3.1), roofMat);
                roof.position.set(17.3, 3.1, -0.3);
                stage.add(roof);
                [[14.5, -1.4], [20.1, -1.4], [14.5, 0.9], [20.1, 0.9]].forEach(([x, z]) => {
                    const support = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.0, 0.16), darkMetal);
                    support.position.set(x, 1.55, z);
                    stage.add(support);
                });
                const bench = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.12, 0.55), new THREE.MeshStandardMaterial({ color: 0x81552e, roughness: 0.82 }));
                bench.position.set(17.2, 0.72, 0.15);
                stage.add(bench);
                makeLandmarkBoard(stage, profile.stage, 'MATATU · BUS STAGE', 14.1, 3.25, 2.2, 5.7);
                const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 2.8, 8), darkMetal);
                signPost.position.set(14.1, 1.45, 2.2);
                stage.add(signPost);

                // Parked local shuttle / matatu with side glazing and wheel detail.
                const bus = new THREE.Group();
                const body = new THREE.Mesh(new THREE.BoxGeometry(2.45, 2.55, 7.4), new THREE.MeshStandardMaterial({ color: profile.busColor, metalness: 0.24, roughness: 0.34 }));
                body.position.y = 1.48;
                body.castShadow = true;
                const lower = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.65, 7.3), new THREE.MeshStandardMaterial({ color: 0xf4f1e6, roughness: 0.55 }));
                lower.position.y = 0.76;
                bus.add(body, lower);
                const windowMat = new THREE.MeshPhysicalMaterial({ color: 0x10232a, roughness: 0.1, metalness: 0.2, clearcoat: 0.9 });
                for (let i = 0; i < 5; i++) {
                    [-1, 1].forEach(side => {
                        const window = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.82, 0.95), windowMat);
                        window.position.set(side * 1.24, 1.83, -2.55 + i * 1.23);
                        bus.add(window);
                    });
                }
                [[-1.22, 0.46, -2.45], [1.22, 0.46, -2.45], [-1.22, 0.46, 2.45], [1.22, 0.46, 2.45]].forEach(([x, y, z]) => {
                    const wheel = createRealisticWheel(0.46, 0.3);
                    wheel.position.set(x, y, z);
                    bus.add(wheel);
                });
                bus.position.set(22.1, 0, -1.8);
                stage.add(bus);

                const people = [];
                [[14.9, 0.8], [16.2, 1.2], [18.8, 1.2], [19.7, -2.8]].forEach(([x, z], i) => {
                    const person = createPedestrian();
                    person.position.set(x, 0.14, z);
                    person.userData.baseY = 0.14;
                    person.rotation.y = i % 2 ? Math.PI * 0.5 : -Math.PI * 0.5;
                    stage.add(person);
                    people.push({ person, phase: i * 1.7, routeId });
                });
                journeyPeople.push(...people);
                parent.add(stage);
            }

            function buildCheckpoint(parent, profile) {
                const checkpoint = new THREE.Group();
                checkpoint.position.z = -545;
                const boothMat = new THREE.MeshStandardMaterial({ color: 0xd6d1c4, roughness: 0.8 });
                const roofMat = new THREE.MeshStandardMaterial({ color: 0x1b4d3e, roughness: 0.56 });
                const postMat = new THREE.MeshStandardMaterial({ color: 0x58636a, metalness: 0.62, roughness: 0.42 });
                const booth = new THREE.Mesh(new THREE.BoxGeometry(3.5, 2.8, 3.2), boothMat);
                booth.position.set(20, 1.4, -1.1);
                booth.castShadow = true;
                const boothRoof = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.26, 3.8), roofMat);
                boothRoof.position.set(20, 2.94, -1.1);
                checkpoint.add(booth, boothRoof);
                const boothWindow = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.76, 1.4), new THREE.MeshPhysicalMaterial({ color: 0x183540, roughness: 0.08, metalness: 0.15 }));
                boothWindow.position.set(18.23, 1.94, -1.1);
                checkpoint.add(boothWindow);
                const sign = makeLandmarkBoard(checkpoint, profile.checkpoint, 'AXLE / MOBILE CHECK', 13.9, 4.3, 6.7, 7.4);
                const signSupport = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 4.2, 8), postMat);
                signSupport.position.set(13.9, 2.1, 6.7);
                checkpoint.add(signSupport);

                // Axle scale strip, cones, a portable barrier, and a flashing checkpoint beacon.
                const scale = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.055, 6.8), new THREE.MeshStandardMaterial({ color: 0x555d60, metalness: 0.5, roughness: 0.45 }));
                scale.position.set(8.2, 0.04, 1.5);
                checkpoint.add(scale);
                const hazard = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.72 });
                for (let i = 0; i < 4; i++) {
                    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.72, 10), hazard);
                    cone.position.set(5.2 + (i % 2) * 5.8, 0.4, -2.8 + Math.floor(i / 2) * 8.5);
                    checkpoint.add(cone);
                }
                const barrierPole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 2.2, 8), postMat);
                barrierPole.position.set(11.3, 1.1, 4.2);
                const barrierArm = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.16, 0.18), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 }));
                barrierArm.position.set(13.25, 2.0, 4.2);
                for (let i = 0; i < 5; i++) {
                    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.17, 0.19), hazard);
                    stripe.position.set(11.2 + i * 0.83, 2.0, 4.2);
                    checkpoint.add(stripe);
                }
                checkpoint.add(barrierPole, barrierArm);
                const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 8), new THREE.MeshStandardMaterial({ color: 0xf87171, emissive: 0xdc2626, emissiveIntensity: 1.3 }));
                beacon.position.set(20, 3.35, -1.1);
                checkpoint.add(beacon);
                checkpointBeacons.push(beacon);
                const officer = createPedestrian();
                officer.position.set(17.3, 0, 2.1);
                officer.userData.baseY = 0;
                officer.scale.setScalar(0.94);
                checkpoint.add(officer);
                journeyPeople.push({ person: officer, phase: 2.1, routeId: parent.userData.routeId });
                parent.add(checkpoint);
            }

            function addElevatedRoadSection(parent, start, end, width, deckMat, railMat) {
                const from = new THREE.Vector3(...start);
                const to = new THREE.Vector3(...end);
                const direction = to.clone().sub(from);
                const length = direction.length();
                const section = new THREE.Group();
                section.position.copy(from).add(to).multiplyScalar(0.5);
                section.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), direction.normalize());

                const deck = new THREE.Mesh(new THREE.BoxGeometry(width, 0.48, length), deckMat);
                deck.receiveShadow = true;
                deck.castShadow = true;
                section.add(deck);

                const asphalt = new THREE.Mesh(new THREE.BoxGeometry(width - 0.5, 0.045, length - 0.4), new THREE.MeshStandardMaterial({ color: 0x30363b, roughness: 0.84 }));
                asphalt.position.y = 0.262;
                section.add(asphalt);

                const edgePaint = new THREE.MeshStandardMaterial({ color: 0xf4d66f, roughness: 0.7 });
                [-1, 1].forEach(side => {
                    const edge = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.035, length - 0.7), edgePaint);
                    edge.position.set(side * (width * 0.5 - 0.48), 0.3, 0);
                    section.add(edge);
                    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.72, length), railMat);
                    rail.position.set(side * (width * 0.5 - 0.12), 0.62, 0);
                    rail.castShadow = true;
                    section.add(rail);
                });

                for (let z = -length * 0.5 + 2; z < length * 0.5 - 1; z += 7) {
                    const dash = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.035, 2.7), new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.72 }));
                    dash.position.set(0, 0.3, z);
                    section.add(dash);
                }
                parent.add(section);
            }

            function buildExpresswayFlyover(parent, profile) {
                const flyover = new THREE.Group();
                flyover.position.z = -165;
                const concrete = new THREE.MeshStandardMaterial({ color: 0x8d9697, roughness: 0.88 });
                const steel = new THREE.MeshStandardMaterial({ color: 0x657176, metalness: 0.72, roughness: 0.36 });

                // Side-road ramps climb over the through highway, leaving a clear
                // underpass for the truck. Sloped sections use the same curved 3D frame.
                addElevatedRoadSection(flyover, [-55, 0.35, 0], [-16, 7.15, 0], 8.8, concrete, steel);
                addElevatedRoadSection(flyover, [-16, 7.15, 0], [16, 7.15, 0], 8.8, concrete, steel);
                addElevatedRoadSection(flyover, [16, 7.15, 0], [55, 0.35, 0], 8.8, concrete, steel);

                [-16, 16].forEach(x => {
                    [-3.55, 3.55].forEach(z => {
                        const pier = new THREE.Mesh(new THREE.BoxGeometry(1.35, 6.9, 1.3), concrete);
                        pier.position.set(x, 3.45, z);
                        pier.castShadow = true;
                        pier.receiveShadow = true;
                        flyover.add(pier);
                        const footing = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.55, 2.05), steel);
                        footing.position.set(x, 0.3, z);
                        flyover.add(footing);
                    });
                    const cap = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.62, 10.4), concrete);
                    cap.position.set(x, 6.9, 0);
                    flyover.add(cap);
                });

                // A visible KeNHA-style sign makes the elevated interchange read clearly.
                const signSupports = new THREE.MeshStandardMaterial({ color: 0x58666b, metalness: 0.68, roughness: 0.4 });
                [-5.5, 5.5].forEach(x => {
                    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 2.6, 8), signSupports);
                    post.position.set(x, 9.1, 5.4);
                    flyover.add(post);
                });
                makeLandmarkBoard(flyover, 'EXPRESSWAY FLYOVER', `${profile.routeTitle} · KEEP LEFT`, 0, 10.4, 5.4, 11.2);
                parent.add(flyover);
            }

            function buildScenicCorner(parent, profile) {
                const corner = new THREE.Group();
                corner.position.z = -485;
                const turnSide = ['A109', 'A3_B8'].includes(profile.id) ? -1 : 1;
                const asphalt = new THREE.MeshStandardMaterial({ color: 0x292f32, roughness: 0.84 });
                const paint = new THREE.MeshStandardMaterial({ color: 0xf5f0d8, roughness: 0.68 });
                const guard = new THREE.MeshStandardMaterial({ color: 0x899397, metalness: 0.62, roughness: 0.42 });
                const points = [
                    [turnSide * 12.8, 16], [turnSide * 15.0, 10], [turnSide * 18.7, 5],
                    [turnSide * 22.5, -3], [turnSide * 24.2, -13], [turnSide * 23.8, -25], [turnSide * 20.5, -36]
                ];
                createRoadRibbon(corner, points, 7.2, asphalt);

                const shifted = offset => points.map(([x, z], index) => {
                    const next = points[Math.min(points.length - 1, index + 1)];
                    const previous = points[Math.max(0, index - 1)];
                    const dx = next[0] - previous[0], dz = next[1] - previous[1];
                    const length = Math.hypot(dx, dz) || 1;
                    return [x - dz / length * offset, z + dx / length * offset];
                });
                [-3.35, 3.35].forEach(offset => createRoadRibbon(corner, shifted(offset), 0.16, paint));
                createRoadRibbon(corner, shifted(turnSide * 4.25), 0.32, guard);

                const curve = new THREE.CatmullRomCurve3(points.map(([x, z]) => new THREE.Vector3(x, 0.1, z)));
                for (let i = 2; i <= 8; i += 2) {
                    const t = i / 10;
                    const point = curve.getPoint(t);
                    const tangent = curve.getTangent(t);
                    const marker = new THREE.Group();
                    marker.position.set(point.x + turnSide * 4.3, 0.95, point.z);
                    marker.rotation.y = Math.atan2(tangent.x, tangent.z);
                    const board = new THREE.Mesh(new THREE.BoxGeometry(1.25, 0.76, 0.12), new THREE.MeshStandardMaterial({ color: i % 4 === 0 ? 0xf97316 : 0xf8fafc, roughness: 0.55 }));
                    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.82, 0.14), new THREE.MeshStandardMaterial({ color: 0x172033, roughness: 0.58 }));
                    marker.add(board, stripe);
                    corner.add(marker);
                }
                makeLandmarkBoard(corner, 'SCENIC CORNER', 'SLOW · FOLLOW THE CURVE', turnSide * 29, 4.2, -8, 6.2);
                const signPost = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.11, 3.7, 8), guard);
                signPost.position.set(turnSide * 29, 1.9, -8);
                corner.add(signPost);
                parent.add(corner);
            }

            function buildRegionalLandmarks(parent, profile) {
                const rock = new THREE.MeshStandardMaterial({ color: profile.bank, roughness: 0.98 });
                const green = new THREE.MeshStandardMaterial({ color: profile.greens, roughness: 0.96 });

                if (profile.id === 'A104') {
                    // Layered escarpment walls frame the Great Rift Valley road.
                    [-1, 1].forEach(side => {
                        for (let i = 0; i < 3; i++) {
                            const ridge = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), i === 1 ? green : rock);
                            ridge.scale.set(24 + i * 8, 17 + i * 3, 95);
                            ridge.position.set(side * (61 + i * 7), 5 + i * 2, -190 - i * 88);
                            ridge.receiveShadow = true;
                            parent.add(ridge);
                        }
                    });
                } else if (profile.id === 'A1') {
                    // Lake Victoria shoreline, reeds, and a reflective horizon.
                    const lake = new THREE.Mesh(new THREE.PlaneGeometry(160, 230), new THREE.MeshStandardMaterial({ color: profile.water, roughness: 0.22, metalness: 0.12 }));
                    lake.rotation.x = -Math.PI / 2;
                    lake.position.set(-92, -0.015, -235);
                    parent.add(lake);
                    const bank = new THREE.Mesh(new THREE.BoxGeometry(9, 0.52, 230), rock);
                    bank.position.set(-15, 0.14, -235);
                    parent.add(bank);
                    for (let i = 0; i < 14; i++) {
                        const reed = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.06, 1.5 + (i % 4) * 0.25, 5), green);
                        reed.position.set(-20 - (i % 3) * 1.1, 0.6, -150 - i * 12);
                        reed.rotation.z = (i % 2 ? 1 : -1) * 0.12;
                        parent.add(reed);
                    }
                } else if (profile.id === 'A2') {
                    // Distant Mount Kenya silhouettes above the foothills.
                    for (let i = 0; i < 3; i++) {
                        const side = i % 2 ? -1 : 1;
                        const peak = new THREE.Mesh(new THREE.ConeGeometry(22 + (i % 2) * 8, 55 + i * 6, 7), rock);
                        peak.position.set(side * (74 + i * 11), 19 + i * 2, -275 - i * 58);
                        peak.rotation.y = i * 0.46;
                        peak.receiveShadow = true;
                        parent.add(peak);
                        const summit = new THREE.Mesh(new THREE.ConeGeometry(8.5, 15, 7), new THREE.MeshStandardMaterial({ color: 0xc8d0cf, roughness: 0.9 }));
                        summit.position.set(peak.position.x, peak.position.y + 22 + i * 2, peak.position.z);
                        summit.rotation.y = peak.rotation.y;
                        parent.add(summit);
                    }
                } else if (profile.id === 'A109' || profile.id === 'A3_B8') {
                    // Dry red-earth kopjes and scattered scrub for the southern and Tana routes.
                    for (let i = 0; i < 10; i++) {
                        const side = i % 2 ? -1 : 1;
                        const kopje = new THREE.Mesh(new THREE.DodecahedronGeometry(3.5 + (i % 3) * 1.7, 1), rock);
                        kopje.scale.set(1.6, 1.15 + (i % 2) * 0.2, 1.3);
                        kopje.position.set(side * (38 + (i % 4) * 8), 1.1, -90 - i * 54);
                        kopje.castShadow = true;
                        parent.add(kopje);
                    }
                } else {
                    // Rolling tea terraces give the Mau and western highlands a distinct profile.
                    const terrace = new THREE.MeshStandardMaterial({ color: profile.greens, roughness: 0.96 });
                    for (let side of [-1, 1]) {
                        for (let row = 0; row < 5; row++) {
                            const hedge = new THREE.Mesh(new THREE.BoxGeometry(22 + row * 3, 0.72, 1.15), terrace);
                            hedge.position.set(side * (42 + row * 3), 0.38 + row * 0.95, -130 - row * 24);
                            hedge.rotation.y = side * (0.06 + row * 0.015);
                            parent.add(hedge);
                        }
                    }
                }
            }

            function buildJourneyScenery() {
                const activeId = activeJourneyProfile();
                if (journeyFeatures.some(feature => feature.userData.routeId === activeId)) return;
                journeyFeatures.forEach(feature => {
                    scene.remove(feature);
                    feature.traverse(node => {
                        node.geometry?.dispose?.();
                        const mats = Array.isArray(node.material) ? node.material : (node.material ? [node.material] : []);
                        mats.forEach(mat => { mat.map?.dispose?.(); mat.dispose?.(); });
                    });
                });
                journeyFeatures = [];
                journeyPeople = [];
                journeyWaterRipples = [];
                checkpointBeacons = [];
                const profiles = [
                    { id: 'A104', biome: 'highland', river: 'MALEWA RIVER', stage: 'NAIVASHA', checkpoint: 'GILGIL WEIGHBRIDGE', water: 0x387f9a, bank: 0x806b48, busColor: 0x1b8256, greens: 0x416a32, routeTitle: 'GREAT RIFT VALLEY · MAI MAHIU' },
                    { id: 'A109', biome: 'savanna', river: 'SABA SABA RIVER', stage: 'VOI', checkpoint: 'MARIAKANI WEIGHBRIDGE', water: 0x547b73, bank: 0x9a7445, busColor: 0xe2a523, greens: 0x59652d, routeTitle: 'TSAVO SAVANNAH · VOI' },
                    { id: 'A1', biome: 'highland', river: 'NYANDO RIVER', stage: 'KISUMU', checkpoint: 'WEBUYE AXLE CHECK', water: 0x397c91, bank: 0x756b4f, busColor: 0x2b7cba, greens: 0x3b6738, routeTitle: 'WESTERN HIGHLANDS · NYANZA' },
                    { id: 'A2', biome: 'highland', river: 'SAGANA RIVER', stage: 'NYERI · NANYUKI', checkpoint: 'ISIOLO CHECKPOINT', water: 0x438695, bank: 0x746d52, busColor: 0x198754, greens: 0x35633b, routeTitle: 'ABERDARE · MOUNT KENYA FOOTHILLS' },
                    { id: 'A3_B8', biome: 'savanna', river: 'TANA RIVER', stage: 'GARISSA · HOLA', checkpoint: 'GARISSA ROAD CHECK', water: 0x5f7f66, bank: 0x9c8050, busColor: 0xb46e25, greens: 0x6d7136, routeTitle: 'TANA BASIN · NORTHERN FRONTIER' },
                    { id: 'B3', biome: 'savanna', river: 'SONDU RIVER', stage: 'NAROK · BOMET', checkpoint: 'BOMET ROAD CHECK', water: 0x477e83, bank: 0x756849, busColor: 0x9455a6, greens: 0x526737, routeTitle: 'MAU HIGHLANDS · SOUTH RIFT' }
                ];
                const profile = profiles.find(item => item.id === activeId) || profiles[0];
                {
                    const root = new THREE.Group();
                    root.userData.routeId = profile.id;
                    root.visible = true;
                    root.position.z = 0;
                    const rockMat = new THREE.MeshStandardMaterial({ color: profile.bank, roughness: 1 });
                    const hillMat = new THREE.MeshStandardMaterial({ color: profile.greens, roughness: 0.98 });
                    for (let i = 0; i < 8; i++) {
                        const side = i % 2 ? 1 : -1;
                        const hill = new THREE.Mesh(new THREE.SphereGeometry(1, 18, 12), i % 3 ? hillMat : rockMat);
                        hill.scale.set(19 + (i % 3) * 9, 8 + (i % 4) * 3.5, 28 + (i % 2) * 16);
                        hill.position.set(side * (44 + (i % 2) * 17), -2.6, -68 - i * 68);
                        hill.receiveShadow = true;
                        root.add(hill);
                    }
                    const treeColors = [profile.greens, 0x456d38, 0x6c7138];
                    for (let i = 0; i < 22; i++) {
                        const side = i % 2 ? 1 : -1;
                        const x = side * (17.5 + (i % 4) * 3.2);
                        const z = -24 - i * 28;
                        addRouteTree(root, x, z, treeColors[i % treeColors.length], 0.68 + (i % 4) * 0.13);
                        if (i % 4 === 0) {
                            const boulder = new THREE.Mesh(new THREE.DodecahedronGeometry(1.1 + (i % 3) * 0.3, 0), rockMat);
                            boulder.position.set(-x * 1.55, 0.25, z - 5);
                            boulder.scale.y = 0.55;
                            root.add(boulder);
                        }
                    }
                    buildRegionalLandmarks(root, profile);
                    buildExpresswayFlyover(root, profile);
                    buildScenicCorner(root, profile);
                    makeLandmarkBoard(root, profile.routeTitle, profile.biome === 'highland' ? 'ELEVATION · HIGHLAND ROUTE' : 'SAVANNAH · ROUTE AHEAD', 0, 8.6, -105, 12.8);
                    const gantryLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.19, 8, 10), new THREE.MeshStandardMaterial({ color: 0x68777b, metalness: 0.7, roughness: 0.42 }));
                    gantryLeg.position.set(-13.5, 4, -105);
                    root.add(gantryLeg);
                    buildRiverBridge(root, profile);
                    buildBusStage(root, profile, profile.id);
                    buildCheckpoint(root, profile);
                    scene.add(root);
                    journeyFeatures.push(root);
                }
            }

            function activeJourneyProfile() {
                const id = state.activeCorridor.id;
                if (['A104', 'A109', 'A1', 'A2', 'A3_B8', 'B3'].includes(id)) return id;
                const code = state.activeCorridor.code;
                if (code === 'A3' || code === 'B8') return 'A3_B8';
                return ['A104', 'A109', 'A1', 'A2', 'B3'].includes(code) ? code : 'A104';
            }

            function activateJourneyScenery() {
                const activeId = activeJourneyProfile();
                if (!journeyFeatures.some(feature => feature.userData.routeId === activeId)) buildJourneyScenery();
                journeyFeatures.forEach(feature => { feature.visible = feature.userData.routeId === activeId; });
                if (groundMesh && groundMesh.material) {
                    const biome = state.activeCorridor.biome;
                    const groundColor = biome === 'coastal' ? 0x756447 : biome === 'savanna' ? 0x777248 : biome === 'metropolis' ? 0x4d6242 : 0x3d6040;
                    groundMesh.material.color.setHex(groundColor);
                }
            }

            function createTruckProfile(points, width, material) {
                const shape = new THREE.Shape();
                points.forEach(([z, y], i) => {
                    const px = -z;
                    if (i === 0) shape.moveTo(px, y);
                    else shape.lineTo(px, y);
                });
                shape.closePath();
                const geometry = new THREE.ExtrudeGeometry(shape, {
                    depth: width,
                    steps: 1,
                    bevelEnabled: true,
                    bevelSegments: 3,
                    bevelThickness: 0.03,
                    bevelSize: 0.03
                });
                geometry.rotateY(Math.PI / 2);
                geometry.translate(-width / 2, 0, 0);
                geometry.computeVertexNormals();
                const mesh = new THREE.Mesh(geometry, material);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                return mesh;
            }

            function createTruckSidePanel(points, x, material) {
                const shape = new THREE.Shape();
                points.forEach(([z, y], i) => {
                    const px = -z;
                    if (i === 0) shape.moveTo(px, y);
                    else shape.lineTo(px, y);
                });
                shape.closePath();
                const mesh = new THREE.Mesh(new THREE.ShapeGeometry(shape, 12), material);
                mesh.rotation.y = Math.PI / 2;
                mesh.position.x = x;
                return mesh;
            }

            /** Aerodynamic sleeper tractor with rounded PBR cab, inset glass and detailed front fascia. */
            function buildRealisticSemiTruck() {
                truckRoot = new THREE.Group();
                truckRoot.position.set(state.x, 0, 0);
                scene.add(truckRoot);

                cabGroup = new THREE.Group();
                truckRoot.add(cabGroup);

                // Realistic Metallic Crimson-Red Clearcoat Paint
                const paintMat = new THREE.MeshPhysicalMaterial({
                    color: 0xb91c1c,
                    metalness: 0.65,
                    roughness: 0.22,
                    clearcoat: 1.0,
                    clearcoatRoughness: 0.08
                });

                const chromeMat = new THREE.MeshStandardMaterial({
                    color: 0xf8fafc,
                    metalness: 0.96,
                    roughness: 0.08
                });

                const darkChassisMat = new THREE.MeshStandardMaterial({
                    color: 0x111827,
                    metalness: 0.6,
                    roughness: 0.5
                });

                const tintedGlassMat = new THREE.MeshPhysicalMaterial({
                    color: 0x102a38,
                    metalness: 0.18,
                    roughness: 0.11,
                    clearcoat: 1,
                    clearcoatRoughness: 0.04,
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.DoubleSide
                });

                // Heavy Steel Ladder Frame Chassis
                const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.65, 6.8), darkChassisMat);
                chassis.position.set(0, 0.9, -0.3);
                chassis.castShadow = true;
                cabGroup.add(chassis);

                // A single sculpted side profile gives the hood, sloped windshield and sleeper one natural silhouette.
                const cabBody = createTruckProfile([
                    [1.15, 0.94], [1.15, 3.38], [0.62, 3.98], [-0.12, 4.14], [-0.78, 4.06],
                    [-1.02, 3.9], [-2.9, 2.5], [-4.22, 2.23], [-4.34, 1.22], [-4.15, 0.94],
                    [-3.52, 0.94], [-3.42, 1.18], [-3.23, 1.41], [-2.96, 1.52], [-2.68, 1.54],
                    [-2.41, 1.44], [-2.2, 1.19], [-2.1, 0.94], [-0.22, 0.94], [0.02, 1.18],
                    [0.29, 1.4], [0.58, 1.48], [0.83, 1.39], [1.03, 1.12]
                ], 2.66, paintMat);
                cabGroup.add(cabBody);

                // Deep tinted panoramic windscreen follows the long forward rake of the reference truck.
                const windshield = new THREE.Mesh(new THREE.PlaneGeometry(2.05, 2.12), tintedGlassMat);
                windshield.position.set(0, 3.18, -2.12);
                windshield.rotation.x = 0.94;
                cabGroup.add(windshield);
                const windshieldPillarMat = new THREE.MeshStandardMaterial({ color: 0x8b111c, metalness: 0.38, roughness: 0.28 });
                [-1.08, 1.08].forEach(x => {
                    const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.085, 2.16, 0.09), windshieldPillarMat);
                    pillar.position.set(x, 3.18, -2.12);
                    pillar.rotation.x = 0.94;
                    cabGroup.add(pillar);
                });

                // Side glass, door seams and handles sit flush with the sculpted cab sides.
                const sideGlassMat = tintedGlassMat.clone();
                const doorWindow = [[-0.92, 2.31], [-0.92, 3.25], [-0.23, 3.68], [0.48, 3.66], [0.48, 2.31]];
                const sleeperWindow = [[0.68, 2.46], [0.68, 3.23], [0.98, 3.42], [1.03, 2.46]];
                [-1.38, 1.38].forEach(x => {
                    cabGroup.add(createTruckSidePanel(doorWindow, x, sideGlassMat));
                    cabGroup.add(createTruckSidePanel(sleeperWindow, x, sideGlassMat));

                    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.07, 0.22), chromeMat);
                    handle.position.set(x * 1.005, 1.94, 0.12);
                    cabGroup.add(handle);

                    const sideStep = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.13, 0.82), darkChassisMat);
                    sideStep.position.set(x * 0.99, 0.86, -0.55);
                    cabGroup.add(sideStep);
                    const stepTread = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.025, 0.72), chromeMat);
                    stepTread.position.set(x * 1.025, 0.93, -0.55);
                    cabGroup.add(stepTread);
                });

                // Long, low hood vents and subtle hood creases catch highlights without a toy-like box shape.
                const ventMat = new THREE.MeshStandardMaterial({ color: 0x2b3038, metalness: 0.55, roughness: 0.34 });
                [-1.23, 1.23].forEach(x => {
                    const vent = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.31, 0.5), ventMat);
                    vent.position.set(x, 1.97, -3.53);
                    cabGroup.add(vent);
                    for (let i = 0; i < 4; i++) {
                        const louver = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.025, 0.4), chromeMat);
                        louver.position.set(x * 1.01, 1.86 + i * 0.075, -3.53);
                        cabGroup.add(louver);
                    }
                });

                // Split mesh grille, projector headlamps, amber markers and a dark lower bumper.
                const grilleBlack = new THREE.MeshStandardMaterial({ color: 0x11151c, metalness: 0.52, roughness: 0.37 });
                [-0.47, 0.47].forEach(centerX => {
                    const surround = new THREE.Mesh(new THREE.BoxGeometry(0.83, 1.04, 0.12), chromeMat);
                    surround.position.set(centerX, 1.82, -4.3);
                    const inset = new THREE.Mesh(new THREE.BoxGeometry(0.69, 0.91, 0.13), grilleBlack);
                    inset.position.set(centerX, 1.82, -4.375);
                    cabGroup.add(surround, inset);
                    for (let i = 0; i < 8; i++) {
                        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.82, 0.03), chromeMat);
                        bar.position.set(centerX - 0.28 + i * 0.08, 1.82, -4.46);
                        cabGroup.add(bar);
                    }
                });
                const centerDivider = new THREE.Mesh(new THREE.BoxGeometry(0.09, 1.12, 0.15), chromeMat);
                centerDivider.position.set(0, 1.82, -4.38);
                cabGroup.add(centerDivider);

                const lampHousingMat = new THREE.MeshStandardMaterial({ color: 0x181c24, metalness: 0.62, roughness: 0.28 });
                const projectorMat = new THREE.MeshPhysicalMaterial({ color: 0xe7f3ff, emissive: 0xc9e6ff, emissiveIntensity: 0.18, roughness: 0.12, clearcoat: 1 });
                const markerMat = new THREE.MeshBasicMaterial({ color: 0xffa629 });
                [-1, 1].forEach(side => {
                    const housing = new THREE.Mesh(new THREE.BoxGeometry(0.57, 0.44, 0.13), lampHousingMat);
                    housing.position.set(side * 0.98, 1.72, -4.31);
                    cabGroup.add(housing);
                    const projector = new THREE.Mesh(new THREE.SphereGeometry(0.145, 18, 14), projectorMat);
                    projector.scale.set(1.2, 0.78, 0.42);
                    projector.position.set(side * 0.98, 1.73, -4.4);
                    cabGroup.add(projector);
                    const indicator = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.035), markerMat);
                    indicator.position.set(side * 1.18, 2.02, -4.37);
                    cabGroup.add(indicator);
                });

                const lowerBumperMat = new THREE.MeshStandardMaterial({ color: 0x20242a, metalness: 0.74, roughness: 0.28 });
                const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(2.62, 0.36, 0.28), lowerBumperMat);
                frontBumper.position.set(0, 0.99, -4.36);
                cabGroup.add(frontBumper);
                const bumperChrome = new THREE.Mesh(new THREE.BoxGeometry(2.48, 0.055, 0.06), chromeMat);
                bumperChrome.position.set(0, 0.87, -4.51);
                cabGroup.add(bumperChrome);

                // Dual Chrome Vertical Exhaust Stacks behind Cab
                [-1.34, 1.34].forEach(ex => {
                    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.3, 14), chromeMat);
                    stack.position.set(ex, 2.65, 0.95);
                    cabGroup.add(stack);

                    // Cylindrical Aluminum Diesel Fuel Tanks
                    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.85, 16), chromeMat);
                    tank.rotation.x = Math.PI / 2;
                    tank.position.set(ex * 0.92, 0.88, 0.15);
                    cabGroup.add(tank);

                    // Exterior Side Rearview Mirrors
                    const mirrorArm = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.07, 0.08), darkChassisMat);
                    mirrorArm.position.set(ex * 1.12, 2.78, -2.0);
                    const mirrorHousing = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.58, 0.3), darkChassisMat);
                    mirrorHousing.position.set(ex * 1.3, 2.65, -2.03);
                    const mirrorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.46, 0.22), tintedGlassMat);
                    mirrorGlass.position.set(ex * 1.36, 2.65, -2.03);
                    cabGroup.add(mirrorArm, mirrorHousing, mirrorGlass);
                });

                // Interior Cockpit Steering Wheel (Visible in Cockpit Camera)
                interiorWheel = new THREE.Mesh(
                    new THREE.TorusGeometry(0.28, 0.038, 10, 24),
                    darkChassisMat
                );
                interiorWheel.position.set(-0.56, 2.25, -1.35);
                interiorWheel.rotation.x = -0.45;
                cabGroup.add(interiorWheel);

                // Functional beams align with the projector lenses in the new fascia.
                leftBeam = new THREE.SpotLight(0xfffbeb, 2.4, 110, Math.PI / 5, 0.45, 1);
                leftBeam.position.set(-0.98, 1.72, -4.38);
                leftBeam.target.position.set(-1.2, 0.2, -45);
                cabGroup.add(leftBeam, leftBeam.target);

                rightBeam = new THREE.SpotLight(0xfffbeb, 2.4, 110, Math.PI / 5, 0.45, 1);
                rightBeam.position.set(0.98, 1.72, -4.38);
                rightBeam.target.position.set(1.2, 0.2, -45);
                cabGroup.add(rightBeam, rightBeam.target);

                // --- 40-FOOT ARTICULATED KENYAN FREIGHT CONTAINER TRAILER ---
                trailerGroup = new THREE.Group();
                trailerGroup.position.set(0, 0, 1.5);
                truckRoot.add(trailerGroup);

                const containerTex = RealismAssets.createContainerTexture();
                const sideMat = new THREE.MeshStandardMaterial({ map: containerTex, roughness: 0.38, metalness: 0.35 });
                const endMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.45, metalness: 0.4 });

                const containerBox = new THREE.Mesh(
                    new THREE.BoxGeometry(2.62, 3.05, 11.4),
                    [sideMat, sideMat, endMat, endMat, endMat, endMat]
                );
                containerBox.position.set(0, 2.68, 5.5);
                containerBox.castShadow = true;
                containerBox.receiveShadow = true;
                trailerGroup.add(containerBox);

                // Aluminum side rails, corner posts and visible rear swing doors.
                const trailerRailMat = new THREE.MeshStandardMaterial({ color: 0xb8bec0, metalness: 0.68, roughness: 0.34 });
                [-1.32, 1.32].forEach(side => {
                    const upperRail = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.1, 11.25), trailerRailMat);
                    upperRail.position.set(side, 4.12, 5.5);
                    const lowerRail = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.13, 11.25), trailerRailMat);
                    lowerRail.position.set(side, 1.28, 5.5);
                    const frontPost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.0, 0.12), trailerRailMat);
                    frontPost.position.set(side, 2.68, -0.12);
                    trailerGroup.add(upperRail, lowerRail, frontPost);
                });

                const doorMat = new THREE.MeshStandardMaterial({ color: 0xe1e4e3, metalness: 0.42, roughness: 0.52 });
                [-0.64, 0.64].forEach(x => {
                    const door = new THREE.Mesh(new THREE.BoxGeometry(1.26, 2.96, 0.07), doorMat);
                    door.position.set(x, 2.68, 11.24);
                    trailerGroup.add(door);
                    const lockBar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.7, 8), trailerRailMat);
                    lockBar.position.set(x, 2.68, 11.31);
                    trailerGroup.add(lockBar);
                    for (let y = 1.55; y <= 3.8; y += 0.75) {
                        const hinge = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.13, 0.1), trailerRailMat);
                        hinge.position.set(x + (x > 0 ? -0.49 : 0.49), y, 11.31);
                        trailerGroup.add(hinge);
                    }
                });
                const doorSeam = new THREE.Mesh(new THREE.BoxGeometry(0.045, 3.0, 0.08), trailerRailMat);
                doorSeam.position.set(0, 2.68, 11.29);
                trailerGroup.add(doorSeam);

                // Rear Steel Underride Bumper & Tail/Brake Lights
                const rearBar = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 0.25), darkChassisMat);
                rearBar.position.set(0, 0.95, 11.2);
                trailerGroup.add(rearBar);

                const brakeMat = new THREE.MeshBasicMaterial({ color: 0x991b1b });
                const bL = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.2, 0.08), brakeMat);
                bL.position.set(-0.9, 0.95, 11.33);
                const bR = bL.clone();
                bR.position.x = 0.9;
                trailerGroup.add(bL, bR);
                brakeLightMeshes.push(bL, bR);

                // Realistic Rubber Tires + Chrome Alcoa Alloy Rims (18-Wheeler Configuration)
                const cabAxles = [
                    [-1.28, 0.56, -2.7], [1.28, 0.56, -2.7],
                    [-1.28, 0.56, 0.6],  [1.28, 0.56, 0.6],
                    [-1.28, 0.56, 1.85], [1.28, 0.56, 1.85]
                ];
                cabAxles.forEach(([wx, wy, wz]) => {
                    const w = createRealisticWheel(0.56, 0.36);
                    w.position.set(wx, wy, wz);
                    cabGroup.add(w);
                    rollingWheels.push(w);
                });

                [8.0, 9.3, 10.6].forEach(wz => {
                    [-1.28, 1.28].forEach(wx => {
                        const w = createRealisticWheel(0.56, 0.38);
                        w.position.set(wx, 0.56, wz);
                        trailerGroup.add(w);
                        rollingWheels.push(w);
                    });
                });

                // Painted fender lips frame the tractor's exposed wheels.
                const archMat = new THREE.MeshPhysicalMaterial({ color: 0x95141b, metalness: 0.58, roughness: 0.26, clearcoat: 0.75 });
                [-2.7, 0.6].forEach(wz => {
                    [-1.35, 1.35].forEach(wx => {
                        const arch = new THREE.Mesh(new THREE.TorusGeometry(0.76, 0.075, 10, 32, Math.PI), archMat);
                        arch.rotation.y = Math.PI / 2;
                        arch.position.set(wx, 0.56, wz);
                        arch.castShadow = true;
                        cabGroup.add(arch);
                    });
                });

                // Five amber roof markers and paired windscreen wipers finish the cab details.
                const roofMarkerMat = new THREE.MeshBasicMaterial({ color: 0xffa11a });
                for (let i = -2; i <= 2; i++) {
                    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.075, 12, 8), roofMarkerMat);
                    marker.position.set(i * 0.39, 4.02, -0.95);
                    cabGroup.add(marker);
                }
                [-0.48, 0.48].forEach(x => {
                    const wiper = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.035, 0.045), darkChassisMat);
                    wiper.position.set(x, 2.67, -2.92);
                    cabGroup.add(wiper);
                });
            }

            function createRealisticWheel(radius, width) {
                const grp = new THREE.Group();
                const tire = new THREE.Mesh(
                    new THREE.CylinderGeometry(radius, radius, width, 24),
                    new THREE.MeshStandardMaterial({ color: 0x14171d, roughness: 0.82 })
                );
                tire.rotation.z = Math.PI / 2;
                tire.castShadow = true;

                const rim = new THREE.Mesh(
                    new THREE.CylinderGeometry(radius * 0.56, radius * 0.56, width + 0.03, 18),
                    new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.92, roughness: 0.14 })
                );
                rim.rotation.z = Math.PI / 2;

                const hub = new THREE.Mesh(
                    new THREE.CylinderGeometry(radius * 0.22, radius * 0.22, width + 0.06, 12),
                    new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 })
                );
                hub.rotation.z = Math.PI / 2;

                const rimEdgeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 0.96, roughness: 0.11 });
                const boltMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, metalness: 0.94, roughness: 0.2 });
                [-1, 1].forEach(side => {
                    const lip = new THREE.Mesh(new THREE.TorusGeometry(radius * 0.49, 0.035, 8, 24), rimEdgeMat);
                    lip.rotation.y = Math.PI / 2;
                    lip.position.x = side * (width / 2 + 0.025);
                    grp.add(lip);
                    for (let i = 0; i < 8; i++) {
                        const angle = (i / 8) * Math.PI * 2;
                        const bolt = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 6), boltMat);
                        bolt.position.set(side * (width / 2 + 0.055), Math.cos(angle) * radius * 0.3, Math.sin(angle) * radius * 0.3);
                        grp.add(bolt);
                    }
                });

                grp.add(tire, rim, hub);
                return grp;
            }

            /**
             * REALISTIC 3D ESCORT SUVs (LAND CRUISER PRADO STYLE), SEDANS & KENYAN MATATUS
             * Inspectable in 360° 3D Orbit Camera!
             */
            function buildTrafficCars() {
                const configs = [
                    { name: 'TOYOTA PRADO 4x4 SUV', lane: 9.2, z: -26, color: 0xf8fafc, isSUV: true, speed: 78 },
                    { name: 'EXECUTIVE SALOON CAR', lane: -3.4, z: -65, color: 0x1e293b, isSUV: false, speed: -72 },
                    { name: 'NAIROBI EXPRESS MATATU', lane: 3.4, z: -115, color: 0xf59e0b, isSUV: true, speed: 74 },
                    { name: 'SILVER HARRIER SUV', lane: -9.2, z: -170, color: 0x94a3b8, isSUV: true, speed: -68 },
                    { name: 'BLUE TOURING SEDAN', lane: 9.2, z: -230, color: 0x1d4ed8, isSUV: false, speed: 82 }
                ];

                const glassMat = new THREE.MeshPhysicalMaterial({
                    color: 0x090d16,
                    metalness: 0.15,
                    roughness: 0.06,
                    clearcoat: 1.0
                });

                configs.forEach(cfg => {
                    const car = new THREE.Group();
                    const bodyMat = new THREE.MeshPhysicalMaterial({
                        color: cfg.color,
                        metalness: 0.6,
                        roughness: 0.22,
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.08
                    });

                    const hLower = cfg.isSUV ? 0.88 : 0.68;
                    const lowerBody = new THREE.Mesh(new THREE.BoxGeometry(2.05, hLower, 4.75), bodyMat);
                    lowerBody.position.y = 0.72;
                    lowerBody.castShadow = true;

                    const cabinH = cfg.isSUV ? 0.78 : 0.62;
                    const cabinL = cfg.isSUV ? 3.25 : 2.35;
                    const cabinZ = cfg.isSUV ? 0.35 : 0.25;
                    const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.82, cabinH, cabinL), glassMat);
                    cabin.position.set(0, 0.72 + hLower / 2 + cabinH / 2 - 0.04, cabinZ);

                    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.08, cabinL - 0.15), bodyMat);
                    roof.position.set(0, cabin.position.y + cabinH / 2 + 0.02, cabinZ);

                    // Headlights & Taillights
                    const headMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
                    const tailMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
                    const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.08), headMat);
                    hl1.position.set(-0.72, 0.78, -2.38);
                    const hl2 = hl1.clone(); hl2.position.x = 0.72;

                    const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.18, 0.08), tailMat);
                    tl1.position.set(-0.72, 0.82, 2.38);
                    const tl2 = tl1.clone(); tl2.position.x = 0.72;

                    car.add(lowerBody, cabin, roof, hl1, hl2, tl1, tl2);

                    // 4 Realistic Alloy Wheels
                    [[-0.98, 0.42, -1.45], [0.98, 0.42, -1.45], [-0.98, 0.42, 1.45], [0.98, 0.42, 1.45]].forEach(([wx, wy, wz]) => {
                        const w = createRealisticWheel(0.42, 0.26);
                        w.position.set(wx, wy, wz);
                        car.add(w);
                    });

                    // Rotate oncoming cars 180 degrees so headlights face the player
                    if (cfg.speed < 0) car.rotation.y = Math.PI;

                    car.position.set(cfg.lane, 0, cfg.z);
                    car.userData = { name: cfg.name, speedKmh: cfg.speed };
                    scene.add(car);
                    trafficCars.push(car);
                });
            }

            /**
             * 360° FREE-ORBIT 3D CAMERA GESTURES (MOUSE DRAG + TOUCH DRAG + ZOOM)
             */
            function setupOrbitGestures(canvas) {
                let dragging = false, prevX = 0, prevY = 0;

                canvas.addEventListener('mousedown', e => {
                    if (state.cameraMode !== 1) return;
                    dragging = true;
                    prevX = e.clientX;
                    prevY = e.clientY;
                });
                window.addEventListener('mousemove', e => {
                    if (!dragging || state.cameraMode !== 1) return;
                    state.orbitYaw -= (e.clientX - prevX) * 0.008;
                    state.orbitPitch = THREE.MathUtils.clamp(state.orbitPitch + (e.clientY - prevY) * 0.006, 0.06, 1.25);
                    prevX = e.clientX;
                    prevY = e.clientY;
                });
                window.addEventListener('mouseup', () => dragging = false);

                canvas.addEventListener('wheel', e => {
                    if (state.cameraMode !== 1) return;
                    state.orbitDist = THREE.MathUtils.clamp(state.orbitDist + e.deltaY * 0.01, 6.5, 32);
                }, { passive: true });

                canvas.addEventListener('touchstart', e => {
                    if (state.cameraMode !== 1 || e.touches.length !== 1) return;
                    dragging = true;
                    prevX = e.touches[0].clientX;
                    prevY = e.touches[0].clientY;
                }, { passive: true });

                canvas.addEventListener('touchmove', e => {
                    if (!dragging || state.cameraMode !== 1 || e.touches.length !== 1) return;
                    state.orbitYaw -= (e.touches[0].clientX - prevX) * 0.01;
                    state.orbitPitch = THREE.MathUtils.clamp(state.orbitPitch + (e.touches[0].clientY - prevY) * 0.008, 0.06, 1.25);
                    prevX = e.touches[0].clientX;
                    prevY = e.touches[0].clientY;
                }, { passive: true });

                canvas.addEventListener('touchend', () => dragging = false);
            }

            function getCurrentCounty() {
                const cName = state.activeCorridor.counties[state.countyIdx] || 'Uasin Gishu';
                return KENYA_NETWORK.counties47.find(c => c.name.toLowerCase() === cName.toLowerCase()) || KENYA_NETWORK.counties47[26];
            }

            const PHYSICS_STEP = 1 / 60;
            let lastFrame = 0;
            let physicsAccumulator = 0;
            let dashboardAccumulator = 0;
            let clarityCap = 1.5;
            let adaptiveScale = 1;
            let fpsWindowStart = 0;
            let fpsWindowFrames = 0;
            function loop(now) {
                if (!lastFrame) lastFrame = now;
                const dt = Math.min(0.1, Math.max(0, (now - lastFrame) / 1000));
                lastFrame = now;
                if (document.hidden) return;

                // Keep vehicle handling stable at 60 simulation steps while rendering
                // on every display refresh, including 90 Hz and 120 Hz screens.
                physicsAccumulator = Math.min(physicsAccumulator + dt, PHYSICS_STEP * 5);
                let steps = 0;
                while (physicsAccumulator >= PHYSICS_STEP && steps < 4) {
                    updateVehiclePhysics(PHYSICS_STEP);
                    physicsAccumulator -= PHYSICS_STEP;
                    steps++;
                }
                if (steps === 4 && physicsAccumulator >= PHYSICS_STEP) physicsAccumulator = 0;

                updateWorldAndTraffic(dt, now / 1000);
                updateCamera(dt);
                dashboardAccumulator += dt;
                if (dashboardAccumulator >= 1 / 20) {
                    updateDashboardUI();
                    dashboardAccumulator %= 1 / 20;
                }

                renderer.render(scene, camera);
                updateFrameRate(now);
            }

            function updateFrameRate(now) {
                if (!fpsWindowStart) fpsWindowStart = now;
                fpsWindowFrames++;
                const elapsed = now - fpsWindowStart;
                if (elapsed < 1200) return;

                const fps = fpsWindowFrames * 1000 / elapsed;
                const fpsLabel = document.getElementById('game-fps');
                if (fpsLabel) fpsLabel.textContent = `${Math.round(fps)}`;

                // Reduce GPU work when frame pacing stays below 48 FPS, then
                // restore clarity gradually after the device has spare capacity.
                let changed = false;
                if (fps < 48 && adaptiveScale > 0.65) {
                    adaptiveScale = Math.max(0.65, adaptiveScale - 0.1);
                    changed = true;
                } else if (fps > 72 && adaptiveScale < 1) {
                    adaptiveScale = Math.min(1, adaptiveScale + 0.05);
                    changed = true;
                }
                if (changed) applyRenderScale();

                fpsWindowStart = now;
                fpsWindowFrames = 0;
            }

            function updateVehiclePhysics(dt) {
                // Acceleration & Braking
                if (inputs.gas) {
                    state.speed += 32 * dt;
                } else if (inputs.brake) {
                    if (state.speed > 2) state.speed -= 65 * dt;
                    else state.speed -= 22 * dt;
                } else {
                    state.speed *= Math.pow(0.72, dt);
                    if (Math.abs(state.speed) < 0.2) state.speed = 0;
                }
                state.speed = THREE.MathUtils.clamp(state.speed, -30, 145);

                // Read unified steering value (-1.0 to +1.0) from Wheel, Tilt Gyro, or Keyboard
                const steerInput = Controls.getSteerNormalized(dt);
                if (Math.abs(steerInput) > 0.01) {
                    state.laneAssist = false;
                    state.steerAngle = steerInput * 0.48;
                } else if (state.laneAssist && state.speed > 5) {
                    const targetLane = state.x > 6.3 ? 9.2 : 3.4;
                    state.steerAngle = THREE.MathUtils.clamp((targetLane - state.x) * 0.16, -0.3, 0.3);
                } else {
                    state.steerAngle *= Math.pow(0.03, dt);
                }

                const forwardMps = state.speed / 3.6;
                rollingWheels.forEach(wheel => { wheel.rotation.x += (forwardMps * dt) / 0.56; });
                state.x += Math.sin(state.steerAngle) * forwardMps * 0.74 * dt;
                state.x = THREE.MathUtils.clamp(state.x, -11.3, 11.3);

                truckRoot.position.x = state.x;
                cabGroup.rotation.y = -state.steerAngle * 0.3;
                cabGroup.rotation.z = state.steerAngle * (Math.abs(state.speed) / 145) * 0.06;

                const targetTrailerYaw = state.steerAngle * 0.45;
                state.trailerYaw += (targetTrailerYaw - state.trailerYaw) * Math.min(1, 5.5 * dt);
                trailerGroup.rotation.y = state.trailerYaw;

                if (interiorWheel) {
                    interiorWheel.rotation.z = -state.steerAngle * 4.5;
                }

                brakeLightMeshes.forEach(m => {
                    m.material.color.setHex(inputs.brake ? 0xff2a4b : 0x7f1d1d);
                });

                SoundEngine.update(state.speed);
            }

            function updateWorldAndTraffic(dt, elapsed) {
                const dz = (state.speed / 3.6) * dt;
                roadTex.offset.y -= dz * 0.032;

                if (dz > 0) {
                    state.distTraveled += (dz / 1000) * 4.2;
                    const ratio = Math.min(1, state.distTraveled / state.totalDist);
                    const nextIdx = Math.min(state.activeCorridor.counties.length - 1, Math.floor(ratio * state.activeCorridor.counties.length));
                    if (nextIdx !== state.countyIdx) {
                        state.countyIdx = nextIdx;
                        const c = getCurrentCounty();
                        showToast(`ENTERING ${c.name.toUpperCase()} COUNTY (${c.hwy})`, 'emerald');
                    }
                    if (state.distTraveled >= state.totalDist) {
                        SoundEngine.playHorn();
                        showToast(`CARGO DELIVERED! +KES ${state.activeCorridor.payout.toLocaleString()}`, 'amber');
                        state.distTraveled = 0;
                        state.countyIdx = 0;
                    }
                }

                // Recycle Buildings & Trees
                buildingsAndProps.forEach(obj => {
                    obj.position.z += dz;
                    if (obj.position.z > 25) obj.position.z -= 672;
                    else if (obj.position.z < -650) obj.position.z += 672;
                });

                // Recycle the curved exit and roundabout with the moving highway scenery.
                routeFeatures.forEach(feature => {
                    feature.position.z += dz;
                    if (feature.position.z > 35) feature.position.z -= 660;
                    else if (feature.position.z < -650) feature.position.z += 660;
                });
                journeyFeatures.forEach(feature => {
                    if (!feature.visible) return;
                    feature.position.z += dz;
                    if (feature.position.z > 660) feature.position.z -= 660;
                    else if (feature.position.z < -660) feature.position.z += 660;
                });
                journeyPeople.forEach(({ person, phase }) => {
                    const walk = Math.sin(elapsed * 1.8 + phase) * 0.11;
                    person.userData.leftLeg.rotation.z = walk;
                    person.userData.rightLeg.rotation.z = -walk;
                    person.userData.leftArm.rotation.z = -walk * 0.65;
                    person.userData.rightArm.rotation.z = walk * 0.65;
                    person.position.y = (person.userData.baseY || 0) + Math.abs(walk) * 0.08;
                });
                journeyWaterRipples.forEach(({ mesh, x, z, phase }) => {
                    mesh.position.x = x + Math.sin(elapsed * 0.8 + phase) * 0.38;
                    mesh.position.z = z + Math.cos(elapsed * 0.55 + phase) * 0.18;
                    mesh.material.opacity = 0.16 + (Math.sin(elapsed + phase) + 1) * 0.055;
                });
                checkpointBeacons.forEach(beacon => {
                    beacon.material.emissiveIntensity = 0.55 + (Math.sin(elapsed * 5) + 1) * 0.62;
                });

                // Recycle Overhead KeNHA Gantries
                gantries.forEach(g => {
                    g.position.z += dz;
                    if (g.position.z > 22) {
                        g.position.z -= 600;
                        const c = getCurrentCounty();
                        g.userData.board.material.map.dispose();
                        g.userData.board.material.map = RealismAssets.createRoadSignTexture(c.name, c.hwy, c.town);
                        g.userData.board.material.needsUpdate = true;
                    }
                });

                // Update Realistic 3D Traffic Cars & SUVs
                trafficCars.forEach(car => {
                    const relMps = ((state.speed - car.userData.speedKmh) / 3.6);
                    car.position.z += relMps * dt;
                    if (car.position.z > 40) car.position.z = -380 - Math.random() * 60;
                    else if (car.position.z < -450) car.position.z = 35;

                    // Proximity collision check
                    if (Math.abs(car.position.x - state.x) < 2.25 && Math.abs(car.position.z - 2.2) < 6.2) {
                        state.x += (state.x >= car.position.x ? 1.8 : -1.8);
                        state.speed *= 0.65;
                        state.cargoHealth = Math.max(20, state.cargoHealth - 3);
                        SoundEngine.playAirBrake();
                        showToast('TRAFFIC CONTACT! CARGO INTEGRITY -3%', 'rose');
                    }
                });

                updatePedestrianCrossings(dz, elapsed);
            }

            function updatePedestrianCrossings(dz, elapsed) {
                let nextSignal = null;
                const cycleLength = 42;

                pedestrianCrossings.forEach(crossing => {
                    crossing.position.z += dz;
                    if (crossing.position.z > 30) crossing.position.z -= 660;
                    else if (crossing.position.z < -650) crossing.position.z += 660;

                    const phase = ((elapsed + crossing.userData.phaseOffset) % cycleLength + cycleLength) % cycleLength;
                    const signal = phase < 22 ? 'GREEN' : (phase < 26 ? 'AMBER' : 'RED');
                    crossing.userData.lamps.forEach(lampSet => {
                        ['RED', 'AMBER', 'GREEN'].forEach(color => {
                            const lamp = lampSet[color];
                            lamp.material.emissiveIntensity = color === signal ? 1.7 : 0.025;
                        });
                    });

                    crossing.userData.walkers.forEach((person, i) => {
                        const walkTime = phase - 27 - i * 0.28;
                        const walking = walkTime >= 0 && walkTime < 14;
                        person.visible = walking;
                        if (!walking) {
                            person.position.x = -14.1;
                            return;
                        }
                        const progress = THREE.MathUtils.clamp(walkTime / 14, 0, 1);
                        person.position.x = -14.1 + progress * 28.2;
                        const step = Math.sin(elapsed * 7.2 + i * 1.4) * 0.43;
                        person.userData.leftLeg.rotation.z = step;
                        person.userData.rightLeg.rotation.z = -step;
                        person.userData.leftArm.rotation.z = -step * 0.7;
                        person.userData.rightArm.rotation.z = step * 0.7;
                    });

                    if (crossing.position.z < 8 && (!nextSignal || crossing.position.z > nextSignal.z)) {
                        nextSignal = { z: crossing.position.z, state: signal };
                    }
                });

                state.trafficSignal = nextSignal ? nextSignal.state : 'GREEN';
            }

            function updateCamera(dt) {
                if (state.cameraMode === 0) {
                    // Realistic Dynamic Chase Camera
                    camera.position.x += (state.x * 0.86 - camera.position.x) * Math.min(1, 8 * dt);
                    camera.position.y += (5.3 - camera.position.y) * Math.min(1, 8 * dt);
                    camera.position.z += (15.2 - camera.position.z) * Math.min(1, 8 * dt);
                    camera.lookAt(state.x * 0.92, 2.3, -16);
                } else if (state.cameraMode === 1) {
                    // 360° Free-Orbit 3D Inspection Camera around Truck OR Traffic Car/SUV
                    let targetPos = new THREE.Vector3(state.x, 2.2, 2.0);
                    if (state.orbitTargetIdx > 0) {
                        const car = trafficCars[(state.orbitTargetIdx - 1) % trafficCars.length];
                        if (car) targetPos.set(car.position.x, 1.3, car.position.z);
                    }
                    const dist = state.orbitTargetIdx === 0 ? state.orbitDist : Math.min(state.orbitDist, 10.5);
                    const cx = targetPos.x + Math.sin(state.orbitYaw) * Math.cos(state.orbitPitch) * dist;
                    const cy = targetPos.y + Math.sin(state.orbitPitch) * dist;
                    const cz = targetPos.z + Math.cos(state.orbitYaw) * Math.cos(state.orbitPitch) * dist;
                    camera.position.set(cx, Math.max(0.7, cy), cz);
                    camera.lookAt(targetPos);
                } else if (state.cameraMode === 2) {
                    // Driver Seat Cockpit View
                    camera.position.set(state.x - 0.56, 2.82, -0.85);
                    camera.lookAt(state.x - state.steerAngle * 14, 2.45, -35);
                } else {
                    // Hood / Bumper Highway Cam
                    camera.position.set(state.x, 2.15, -3.95);
                    camera.lookAt(state.x - state.steerAngle * 12, 1.9, -40);
                }
            }

            function updateDashboardUI() {
                const absSpd = Math.round(Math.abs(state.speed));
                document.getElementById('hud-speed').textContent = absSpd;
                document.getElementById('hud-gear').textContent = state.speed < -0.5 ? 'R' : (absSpd === 0 ? 'N' : `D${Math.min(12, Math.ceil(absSpd / 12))}`);
                document.getElementById('hud-rpm').style.width = `${Math.min(100, 10 + ((absSpd % 13) / 13) * 82)}%`;

                const c = getCurrentCounty();
                document.getElementById('hud-hwy').textContent = state.activeCorridor.code;
                document.getElementById('hud-county').textContent = `${c.name.toUpperCase()} COUNTY`;
                document.getElementById('hud-town').textContent = `SECTOR: ${c.town.toUpperCase()}`;

                const rem = Math.max(0, state.totalDist - state.distTraveled);
                document.getElementById('hud-dist').textContent = `${rem.toFixed(1)} KM LEFT`;
                document.getElementById('hud-progress').style.width = `${Math.min(100, (state.distTraveled / state.totalDist) * 100)}%`;
                document.getElementById('hud-cargo').textContent = `${state.cargoHealth}%`;
                document.getElementById('hud-payout').textContent = `KES ${state.activeCorridor.payout.toLocaleString()}`;
                const signalPill = document.getElementById('traffic-status-pill');
                signalPill.dataset.state = state.trafficSignal;
                document.getElementById('traffic-status-label').textContent = `NEXT SIGNAL: ${state.trafficSignal}`;
            }

            function cycleCamera() {
                state.cameraMode = (state.cameraMode + 1) % CAM_NAMES.length;
                document.getElementById('cam-mode-label').textContent = CAM_NAMES[state.cameraMode];
                document.getElementById('orbit-hint-pill').classList.toggle('hidden', state.cameraMode !== 1);
                document.getElementById('traffic-status-pill').classList.toggle('hidden', state.cameraMode === 1);
                showToast(`CAMERA: ${CAM_NAMES[state.cameraMode]}`, 'amber');
            }

            function cycleOrbitTarget() {
                state.orbitTargetIdx = (state.orbitTargetIdx + 1) % (trafficCars.length + 1);
                const label = state.orbitTargetIdx === 0
                    ? 'SEMI-TRUCK'
                    : trafficCars[state.orbitTargetIdx - 1].userData.name;
                document.getElementById('orbit-target-label').textContent = label;
            }

            function setWeather(mode) {
                state.weatherMode = mode;
                skyDome.visible = mode !== 2;
                if (mode === 0) { // Daylight
                    skyDome.material.color.setHex(0xffffff);
                    sunLight.intensity = 1.65;
                    sunLight.color.setHex(0xfffbeb);
                    hemiLight.intensity = 0.95;
                    scene.background.setHex(0x6ba4d9);
                    scene.fog.color.setHex(0x8ab8e0);
                } else if (mode === 1) { // Golden Rift Sunset
                    skyDome.material.color.setHex(0xffad72);
                    sunLight.intensity = 1.4;
                    sunLight.color.setHex(0xfb923c);
                    hemiLight.intensity = 0.75;
                    scene.background.setHex(0x7c2d12);
                    scene.fog.color.setHex(0x9a3412);
                } else { // Nairobi Night
                    sunLight.intensity = 0.25;
                    hemiLight.intensity = 0.35;
                    scene.background.setHex(0x050914);
                    scene.fog.color.setHex(0x050914);
                }
            }

            function setClarity(ratio) {
                clarityCap = THREE.MathUtils.clamp(parseFloat(ratio) || 1, 0.75, 2);
                adaptiveScale = 1;
                applyRenderScale();
                showToast(`CLARITY CAP: ${clarityCap.toFixed(1)}x · AUTO FRAME PACING ON`, 'sky');
            }

            function applyRenderScale() {
                if (!renderer) return;
                const ratio = Math.max(0.65, Math.min(window.devicePixelRatio || 1, clarityCap * adaptiveScale));
                renderer.setPixelRatio(ratio);
                renderer.setSize(window.innerWidth, window.innerHeight);
                const label = document.getElementById('game-render-scale');
                if (label) label.textContent = `${ratio.toFixed(2)}x`;
            }

            function selectCorridor(id) {
                const c = KENYA_NETWORK.corridors.find(item => item.id === id);
                if (!c) return;
                state.activeCorridor = c;
                state.countyIdx = 0;
                state.distTraveled = 0;
                state.totalDist = c.distance;
                activateJourneyScenery();
                document.getElementById('hud-route').textContent = c.name.toUpperCase();
                UI.toggleMap(false);
                showToast(`ROUTE SET: ${c.code} (${c.name})`, 'emerald');
            }

            function warpToCounty(name) {
                const c = KENYA_NETWORK.counties47.find(item => item.name === name);
                if (!c) return;
                state.activeCorridor = {
                    id: c.code, code: c.hwy, name: `${c.name} (${c.town})`,
                    distance: 220, payout: 110000, counties: [c.name, 'Nakuru', 'Nairobi', 'Mombasa']
                };
                state.countyIdx = 0;
                state.distTraveled = 0;
                state.totalDist = 220;
                activateJourneyScenery();
                document.getElementById('hud-route').textContent = `${c.name.toUpperCase()} → ${c.town.toUpperCase()}`;
                UI.toggleMap(false);
                showToast(`GPS LOCATION: ${c.name.toUpperCase()} COUNTY`, 'emerald');
            }

            function requestLandscapeFullscreen() {
                const docEl = document.documentElement;
                if (!document.fullscreenElement && docEl.requestFullscreen) {
                    docEl.requestFullscreen().catch(() => {});
                }
                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock('landscape').catch(() => {});
                }
                document.getElementById('portrait-banner').style.display = 'none';
            }

            function toggleHeadlights() {
                state.headlightsOn = !state.headlightsOn;
                leftBeam.visible = state.headlightsOn;
                rightBeam.visible = state.headlightsOn;
                showToast(`HEADLIGHTS: ${state.headlightsOn ? 'ON' : 'OFF'}`, 'sky');
            }

            function toggleAutopilot() {
                state.laneAssist = !state.laneAssist;
                showToast(`LANE ASSIST: ${state.laneAssist ? 'ACTIVE' : 'OFF'}`, 'emerald');
            }

            function recoverTruck() {
                state.x = 3.4;
                state.steerAngle = 0;
                state.speed = 0;
                SoundEngine.playAirBrake();
                showToast('RECOVERED TO HIGHWAY LANE', 'amber');
            }

            function triggerHorn() {
                SoundEngine.playHorn();
            }

            function onResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                applyRenderScale();
            }

            return {
                init, inputs, cycleCamera, cycleOrbitTarget, setWeather, setClarity,
                selectCorridor, warpToCounty, requestLandscapeFullscreen,
                toggleHeadlights, toggleAutopilot, recoverTruck, triggerHorn
            };
        })();

        /**
         * 5. DUAL STEERING CONTROLLER: ROTARY STEERING WHEEL + GYROSCOPE TILT + KEYS
         */
        const Controls = (() => {
            const MODES = ['WHEEL', 'TILT', 'KEYS'];
            let modeIdx = 0; // 0: WHEEL, 1: TILT, 2: KEYS
            let sensitivity = 1.2;

            // Rotary Wheel State (-225 deg to +225 deg)
            let wheelDeg = 0;
            let isDraggingWheel = false;
            let lastPointerAngle = 0;

            // Gyroscope Tilt State
            let rawGamma = 0;
            let rawBeta = 0;
            let zeroOffset = 0;
            let tiltNorm = 0;
            let gyroActive = false;
            let desktopTiltActive = false;

            function cycleSteeringMode() {
                modeIdx = (modeIdx + 1) % MODES.length;
                const mode = MODES[modeIdx];
                document.getElementById('steer-mode-label').textContent = mode;
                document.getElementById('steer-mode-icon').textContent = mode === 'WHEEL' ? '☸️' : (mode === 'TILT' ? '📐' : '⌨️');

                document.getElementById('ui-wheel-container').classList.toggle('hidden', mode !== 'WHEEL');
                document.getElementById('ui-tilt-container').classList.toggle('hidden', mode !== 'TILT');
                document.getElementById('ui-buttons-container').classList.toggle('hidden', mode !== 'KEYS');

                if (mode === 'TILT') {
                    requestGyroPermission();
                }
                showToast(`STEERING MODE: ${mode}`, 'sky');
            }

            // 1. Rotary Steering Wheel Interaction
            function initRotaryWheel() {
                const wheelEl = document.getElementById('steering-wheel-svg');
                let activePointerId = null;
                wheelEl.style.touchAction = 'none';

                function getAngleFromCenter(clientX, clientY) {
                    const rect = wheelEl.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
                }

                const onDown = (e) => {
                    e.preventDefault();
                    SoundEngine.init();
                    isDraggingWheel = true;
                    activePointerId = e.pointerId;
                    wheelEl.setPointerCapture(e.pointerId);
                    lastPointerAngle = getAngleFromCenter(e.clientX, e.clientY);
                };

                const onMove = (e) => {
                    if (!isDraggingWheel || e.pointerId !== activePointerId) return;
                    if (e.cancelable) e.preventDefault();
                    const curAngle = getAngleFromCenter(e.clientX, e.clientY);
                    let delta = curAngle - lastPointerAngle;
                    if (delta > 180) delta -= 360;
                    if (delta < -180) delta += 360;
                    wheelDeg = THREE.MathUtils.clamp(wheelDeg + delta, -225, 225);
                    lastPointerAngle = curAngle;
                    updateWheelGraphic();
                };

                const onUp = (e) => {
                    if (activePointerId !== null && e.pointerId !== activePointerId) return;
                    isDraggingWheel = false;
                    activePointerId = null;
                };

                wheelEl.addEventListener('pointerdown', onDown);
                wheelEl.addEventListener('pointermove', onMove);
                wheelEl.addEventListener('pointerup', onUp);
                wheelEl.addEventListener('pointercancel', onUp);
                wheelEl.addEventListener('lostpointercapture', onUp);
            }

            function updateWheelGraphic() {
                const wheelEl = document.getElementById('steering-wheel-svg');
                wheelEl.style.transform = `rotate(${wheelDeg}deg)`;
                document.getElementById('wheel-deg-readout').textContent = `${Math.round(wheelDeg)}°`;
            }

            // 2. Device Gyroscope Tilt Steering + Desktop Fallback Slider
            function requestGyroPermission() {
                if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                    DeviceOrientationEvent.requestPermission()
                        .then(res => {
                            if (res === 'granted') {
                                enableDeviceOrientationListener();
                                showToast('GYROSCOPE TILT SENSOR ACTIVE', 'emerald');
                            }
                        })
                        .catch(() => showToast('TILT PERMISSION DENIED', 'rose'));
                } else {
                    enableDeviceOrientationListener();
                }
            }

            function enableDeviceOrientationListener() {
                if (gyroActive) return;
                gyroActive = true;
                window.addEventListener('deviceorientation', e => {
                    if (e.gamma === null || desktopTiltActive) return;
                    rawGamma = e.gamma;
                    rawBeta = e.beta || 0;
                    // Handle landscape orientation tilt axis automatically
                    const isLandscape = window.innerWidth > window.innerHeight;
                    const tiltRaw = isLandscape ? rawBeta : rawGamma;
                    const calibrated = tiltRaw - zeroOffset;
                    tiltNorm = THREE.MathUtils.clamp((calibrated / 28) * sensitivity, -1, 1);
                    updateTiltDisplay(calibrated);
                });
            }

            function updateTiltDisplay(angle) {
                document.getElementById('tilt-angle-val').textContent = `${angle.toFixed(1)}°`;
                document.getElementById('tilt-horizon-bar').style.transform = `rotate(${THREE.MathUtils.clamp(angle, -35, 35)}deg)`;
            }

            function initDesktopTiltDrag() {
                const track = document.getElementById('tilt-horizon-bar').parentElement;
                const updateFromPointer = e => {
                    const rect = track.getBoundingClientRect();
                    const normalized = THREE.MathUtils.clamp(((e.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
                    tiltNorm = normalized;
                    updateTiltDisplay(normalized * 28);
                };
                track.addEventListener('pointerdown', e => {
                    desktopTiltActive = true;
                    track.setPointerCapture(e.pointerId);
                    updateFromPointer(e);
                });
                track.addEventListener('pointermove', e => {
                    if (desktopTiltActive) updateFromPointer(e);
                });
                const release = () => {
                    if (!desktopTiltActive) return;
                    desktopTiltActive = false;
                    tiltNorm = 0;
                    updateTiltDisplay(0);
                };
                track.addEventListener('pointerup', release);
                track.addEventListener('pointercancel', release);
                track.addEventListener('lostpointercapture', release);
            }

            function calibrateTilt() {
                const isLandscape = window.innerWidth > window.innerHeight;
                zeroOffset = isLandscape ? rawBeta : rawGamma;
                tiltNorm = 0;
                updateTiltDisplay(0);
                showToast('TILT HORIZON ZEROED', 'emerald');
            }

            // 3. Keyboard & Pedal Bindings
            function initPedalsAndKeys() {
                const bindHold = (id, prop, onStart) => {
                    const el = document.getElementById(id);
                    el.style.touchAction = 'none';
                    const start = (e) => {
                        e.preventDefault();
                        if (el.hasPointerCapture(e.pointerId)) return;
                        el.setPointerCapture(e.pointerId);
                        SoundEngine.init();
                        Sim.inputs[prop] = true;
                        el.classList.add('active');
                        if (onStart) onStart();
                    };
                    const end = () => {
                        Sim.inputs[prop] = false;
                        el.classList.remove('active');
                    };
                    el.addEventListener('pointerdown', start);
                    el.addEventListener('pointerup', end);
                    el.addEventListener('pointercancel', end);
                    el.addEventListener('lostpointercapture', end);
                };

                bindHold('pedal-gas', 'gas');
                bindHold('pedal-brake', 'brake', () => SoundEngine.playAirBrake());
                bindHold('btn-steer-left', 'left');
                bindHold('btn-steer-right', 'right');

                window.addEventListener('keydown', e => {
                    if (e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
                    SoundEngine.init();
                    const k = e.key.toLowerCase();
                    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) e.preventDefault();
                    if (k === 'w' || e.key === 'ArrowUp') Sim.inputs.gas = true;
                    if (k === 's' || e.key === 'ArrowDown') Sim.inputs.brake = true;
                    if (k === 'a' || e.key === 'ArrowLeft') Sim.inputs.left = true;
                    if (k === 'd' || e.key === 'ArrowRight') Sim.inputs.right = true;
                    if (k === 'v') Sim.cycleCamera();
                    if (k === 'h') Sim.triggerHorn();
                    if (k === 'm') UI.toggleMap();
                });

                window.addEventListener('keyup', e => {
                    if (e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
                    const k = e.key.toLowerCase();
                    if (k === 'w' || e.key === 'ArrowUp') Sim.inputs.gas = false;
                    if (k === 's' || e.key === 'ArrowDown') Sim.inputs.brake = false;
                    if (k === 'a' || e.key === 'ArrowLeft') Sim.inputs.left = false;
                    if (k === 'd' || e.key === 'ArrowRight') Sim.inputs.right = false;
                });

                window.addEventListener('blur', () => {
                    Object.keys(Sim.inputs).forEach(key => { Sim.inputs[key] = false; });
                    ['pedal-gas', 'pedal-brake', 'btn-steer-left', 'btn-steer-right'].forEach(id => {
                        document.getElementById(id)?.classList.remove('active');
                    });
                });
            }

            function getSteerNormalized(dt) {
                const mode = MODES[modeIdx];
                // Keyboard always overrides smoothly if pressed
                if (Sim.inputs.left || Sim.inputs.right) {
                    const keyDir = (Sim.inputs.right ? 1 : 0) - (Sim.inputs.left ? 1 : 0);
                    wheelDeg = THREE.MathUtils.lerp(wheelDeg, keyDir * 160, Math.min(1, 10 * dt));
                    updateWheelGraphic();
                    return THREE.MathUtils.clamp((wheelDeg / 225) * sensitivity, -1, 1);
                }

                if (mode === 'WHEEL') {
                    // Self-centering spring physics when released
                    if (!isDraggingWheel && Math.abs(wheelDeg) > 0.2) {
                        wheelDeg *= Math.pow(0.04, dt);
                        if (Math.abs(wheelDeg) < 0.5) wheelDeg = 0;
                        updateWheelGraphic();
                    }
                    return THREE.MathUtils.clamp((wheelDeg / 225) * sensitivity, -1, 1);
                }

                if (mode === 'TILT') {
                    return tiltNorm;
                }

                return 0;
            }

            function setSensitivity(val) {
                sensitivity = parseFloat(val);
                document.getElementById('sens-readout').textContent = `${sensitivity.toFixed(1)}x`;
            }

            function init() {
                initRotaryWheel();
                initDesktopTiltDrag();
                initPedalsAndKeys();
            }

            return { init, cycleSteeringMode, requestGyroPermission, calibrateTilt, getSteerNormalized, setSensitivity };
        })();

        /**
         * 6. UI CONTROLLER FOR 47-COUNTY MAP & SETTINGS
         */
        const UI = (() => {
            function buildMapLists() {
                const corrEl = document.getElementById('corridor-list');
                corrEl.innerHTML = '';
                KENYA_NETWORK.corridors.forEach(c => {
                    const btn = document.createElement('button');
                    btn.className = 'btn-press w-full text-left p-3 rounded-2xl bg-slate-900/90 border border-slate-700 hover:border-sky-400 flex flex-col gap-0.5';
                    btn.onclick = () => Sim.selectCorridor(c.id);
                    btn.innerHTML = `
                        <div class="flex justify-between items-center">
                            <span class="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-[10px] font-bold">${c.code}</span>
                            <span class="font-mono text-xs text-amber-300 font-bold">KES ${c.payout.toLocaleString()}</span>
                        </div>
                        <div class="font-display font-bold text-xs sm:text-sm text-white mt-0.5">${c.name}</div>
                        <div class="text-[10px] font-mono text-slate-400">${c.distance} KM • ${c.counties.length} COUNTIES</div>
                    `;
                    corrEl.appendChild(btn);
                });

                renderCounties(KENYA_NETWORK.counties47);
            }

            function renderCounties(list) {
                const grid = document.getElementById('counties-grid');
                grid.innerHTML = '';
                list.forEach(c => {
                    const btn = document.createElement('button');
                    btn.className = 'btn-press p-2 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-400 text-left';
                    btn.onclick = () => Sim.warpToCounty(c.name);
                    btn.innerHTML = `
                        <div class="flex justify-between text-[9px] font-mono">
                            <span class="text-slate-500">#${c.code}</span>
                            <span class="text-sky-400 font-bold">${c.hwy}</span>
                        </div>
                        <div class="font-display font-bold text-xs text-white truncate">${c.name}</div>
                        <div class="text-[10px] font-mono text-slate-400 truncate">${c.town}</div>
                    `;
                    grid.appendChild(btn);
                });
            }

            function filterCounties() {
                const q = document.getElementById('county-search').value.trim().toLowerCase();
                const filtered = KENYA_NETWORK.counties47.filter(c =>
                    c.name.toLowerCase().includes(q) || c.town.toLowerCase().includes(q) || c.hwy.toLowerCase().includes(q)
                );
                renderCounties(filtered);
            }

            function toggleMap(force) {
                const m = document.getElementById('modal-map');
                const show = force !== undefined ? force : m.classList.contains('hidden');
                m.classList.toggle('hidden', !show);
            }

            function toggleSettings() {
                document.getElementById('modal-settings').classList.toggle('hidden');
            }

            return { buildMapLists, filterCounties, toggleMap, toggleSettings };
        })();

        window.onload = function () {
            UI.buildMapLists();
            Controls.init();
            Sim.init();
        };
