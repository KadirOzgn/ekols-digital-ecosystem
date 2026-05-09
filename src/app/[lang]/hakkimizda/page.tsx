import Link from "next/link";

export default async function Hakkimizda({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const isEn = lang === 'en';
  
  return (
    <div className="min-h-screen bg-[#0d0e0f] pt-[88px] md:pt-[112px] pb-16 tech-bg relative z-10">
        <div className="px-8 md:px-margin py-16 md:py-[80px] relative">
            <div className="max-w-5xl mx-auto">
                <div className="section-stem mb-6">
                    <span className="text-label-technical text-primary uppercase">{isEn ? "About Us" : "Hakkımızda"}</span>
                </div>
                <h2 className="text-headline-lg text-white uppercase mb-4">
                    {isEn ? "Why Do We " : "Neden "}<span className="text-primary">{isEn ? "Exist?" : "Varız?"}</span>
                </h2>
                <p className="text-body-lg text-zinc-400 mb-16 max-w-4xl border-l border-[#333535] pl-6">
                    {isEn ? 'We believe that living spaces gain value not just with objects, but with "system design". While most furniture is produced just to take up space, at Ekols, we question why each piece exists with engineering precision and architectural spirit. Our goal is not just to make better furniture, but to build a new standard of living where design is in perfect harmony with technical discipline, and aesthetics with function.' : 'Yaşam alanlarının sadece eşyalarla değil, birer "sistem tasarımı" ile değer kazandığına inanıyoruz. Çoğu mobilya sadece yer kaplamak için üretilirken, biz Ekols olarak her bir parçanın neden var olduğunu mühendislik hassasiyeti ve mimari ruhla sorguluyoruz. Amacımız, sadece daha iyi mobilyalar yapmak değil; tasarımın teknik disiplinle, estetiğin ise fonksiyonla kusursuz bir uyum içinde olduğu yeni bir yaşam standardı inşa etmektir.'}
                </p>

                <div className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative z-10">
                            {/* Yazının arkasında duran iç içe 3 üçgen grafiği */}
                            <svg viewBox="0 0 200 200" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] md:w-[150%] md:h-[150%] opacity-10 pointer-events-none text-primary drop-shadow-[0_0_20px_rgba(255,110,0,0.3)] rotate-12 -z-10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="100,50 135,110 65,110" />
                                <polygon points="80,100 115,160 45,160" />
                                <polygon points="120,100 155,160 85,160" />
                            </svg>
                            <h3 className="text-headline-md text-white mb-6 uppercase relative">{isEn ? "The Three Corners of Innovation" : "İnovasyonun Üç Köşesi"}</h3>
                            <p className="text-body-lg text-zinc-400 mb-8">{isEn ? "Instead of copying what exists, we are a design ecosystem formed by an engineer and two architects who came together to create what does not yet exist." : "Biz, mevcut olanı kopyalamak yerine, henüz var olmayanı yaratmak için bir araya gelmiş bir mühendis ve iki mimardan oluşan bir tasarım ekosistemiyiz."}</p>
                            <ul className="flex flex-col gap-8">
                                <li className="flex gap-4 items-start">
                                    <span className="material-symbols-outlined text-primary !text-3xl">memory</span>
                                    <div>
                                        <strong className="text-white block mb-1 text-lg">{isEn ? "Engineering Precision" : "Mühendislik Hassasiyeti"}</strong>
                                        <span className="text-zinc-400">{isEn ? "The engineering vision that constructs the operational intelligence, global reach networks, and system architecture behind our designs." : "Tasarımlarımızın ardındaki operasyonel zekayı, küresel erişim ağlarını ve sistem mimarisini kurgulayan mühendislik vizyonu."}</span>
                                    </div>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="material-symbols-outlined text-primary !text-3xl">architecture</span>
                                    <div>
                                        <strong className="text-white block mb-1 text-lg">{isEn ? "Architectural Aesthetics" : "Mimari Estetik"}</strong>
                                        <span className="text-zinc-400">{isEn ? "Constructs a sophisticated architectural language and spatial experience that goes beyond function, blending forms that add character to the space with the purest forms of premium materials." : "Mekana karakter katan formları, premium materyallerin en saf halleriyle harmanlayarak, fonksiyonun ötesine geçen sofistike bir mimari dil ve mekansal deneyim kurgular."}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="border border-[#333535] p-2 bg-[#1a1c1c] relative glass group aspect-square md:aspect-auto md:h-full overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXQVqi6K4ZcJIDBbCaxJH47Z622pAmSLcLGBYN9b3W6C_t0KXBT68X8bwGtWErOXL1BLpUOYkSk3X-_yxD1ncUo0eMn5o7zj4nxYtRA7XKe9EodAYWDe9RgdVHYuvEMxHjSNrWZOyHVTxzHGYjk56jXiAOJWJIhKWe9Uqab7M2uzcJPSHoib2eSX_ImU5T1tjlso6HBTB9ZwXd8fW0kTd8xLbdMjNJxEuf-BkiqYcFgKJCx78Daz113wdB9ajo40JVelsnYKu0sm1S" alt="Ekols Tasarım Ekosistemi" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1c] via-[#1a1c1c]/20 to-transparent"></div>
                            
                            {/* İnce Dekoratif Çerçeve */}
                            <div className="absolute inset-6 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                        </div>
                    </div>
                </div>

                <div className="mb-24 pt-16 border-t border-[#333535]">
                    <div className="section-stem mb-6">
                        <span className="text-label-technical text-primary uppercase">{isEn ? "Our Process" : "Sürecimiz"}</span>
                    </div>
                    <h3 className="text-headline-lg text-white uppercase mb-4">
                        {isEn ? "Digital Discipline of " : "Fiziksel Formun "}<span className="text-primary">{isEn ? "Physical Form" : "Dijital Disiplini"}</span>
                    </h3>
                    <p className="text-body-lg text-zinc-400 mb-12 max-w-3xl border-l border-[#333535] pl-6">
                        {isEn ? "At Ekols, the process begins with a vertical innovation approach. Instead of following current market standards, we produce our own design technology." : "Ekols’te süreç, dikey bir inovasyon anlayışıyla başlar. Mevcut pazar standartlarını takip etmek yerine, kendi tasarım teknolojimizi üretiyoruz."}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 border border-[#333535] bg-[#121414] relative overflow-hidden hover:border-primary transition-colors group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="text-display-xl text-[#1a1c1c] absolute -right-4 top-4 font-bold select-none pointer-events-none group-hover:text-[#2a2c2c] transition-colors">01</span>
                            <div className="relative z-10">
                                <h4 className="text-body-lg text-white font-bold mb-4 uppercase flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-primary"></span> {isEn ? "Integrated Project Intake and Analysis" : "Entegre Proje Alımı ve Analiz"}
                                </h4>
                                <p className="text-body-md text-zinc-400">{isEn ? "Every new project is first evaluated with the analytical perspective of a systems engineer. It is designed by passing not only how an idea will look, but how it will work within a global ecosystem through engineering filters." : "Her yeni proje, öncelikle bir sistem mühendisinin analitik bakış açısıyla değerlendirilir. Bir fikrin sadece nasıl görüneceği değil, küresel bir ekosistem içinde nasıl çalışacağı mühendislik filtrelerinden geçirilerek projelendirilir."}</p>
                            </div>
                        </div>
                        <div className="p-8 border border-[#333535] bg-[#121414] relative overflow-hidden hover:border-primary transition-colors group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="text-display-xl text-[#1a1c1c] absolute -right-4 top-4 font-bold select-none pointer-events-none group-hover:text-[#2a2c2c] transition-colors">02</span>
                            <div className="relative z-10">
                                <h4 className="text-body-lg text-white font-bold mb-4 uppercase flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-primary"></span> {isEn ? "Architectural Synthesis and 'Digital Twin'" : "Mimari Sentez ve 'Dijital İkiz'"}
                                </h4>
                                <p className="text-body-md text-zinc-400">{isEn ? "Every design developed by our architects is simulated millimeter by millimeter in a digital environment before entering the production line. Creating a 'Digital Twin' of each product is our technological signature that eliminates the margin of error and takes our standards to the top." : "Mimarlarımız tarafından geliştirilen her tasarım, üretim bandına girmeden önce dijital ortamda milimetrik olarak simüle edilir. Her ürünün bir 'Dijital İkiz'inin oluşturulması, hata payını ortadan kaldıran ve standartlarımızı zirveye taşıyan teknolojik imzamızdır."}</p>
                            </div>
                        </div>
                        <div className="p-8 border border-[#333535] bg-[#121414] relative overflow-hidden hover:border-primary transition-colors group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="text-display-xl text-[#1a1c1c] absolute -right-4 top-4 font-bold select-none pointer-events-none group-hover:text-[#2a2c2c] transition-colors">03</span>
                            <div className="relative z-10">
                                <h4 className="text-body-lg text-white font-bold mb-4 uppercase flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-primary"></span> {isEn ? "Smart Connection Technology" : "Akıllı Bağlantı Teknolojisi"}
                                </h4>
                                <p className="text-body-md text-zinc-400">{isEn ? "The biggest difference in our designs is hidden where engineering genius meets aesthetics. Thanks to interlocking CNC technology, we use modern joining techniques that require no tools or screws, turning installation into an art form." : "Tasarımlarımızdaki en büyük fark, mühendislik dehasının estetikle birleştiği noktalarda gizlidir. Geçmeli (interlocking) CNC teknolojisi sayesinde, alet ve vida gerektirmeyen, kurulumu bir sanata dönüştüren modern birleşim teknikleri kullanıyoruz."}</p>
                            </div>
                        </div>
                        <div className="p-8 border border-[#333535] bg-[#121414] relative overflow-hidden hover:border-primary transition-colors group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full transform translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
                            <span className="text-display-xl text-[#1a1c1c] absolute -right-4 top-4 font-bold select-none pointer-events-none group-hover:text-[#2a2c2c] transition-colors">04</span>
                            <div className="relative z-10">
                                <h4 className="text-body-lg text-white font-bold mb-4 uppercase flex items-center gap-3">
                                    <span className="w-8 h-[2px] bg-primary"></span> {isEn ? "Global Reach" : "Sınırları Aşan Erişim"}
                                </h4>
                                <p className="text-body-md text-zinc-400">{isEn ? "We construct our products with smartly designed flat-pack structures suitable for shipping. This technological approach ensures that our designs reach everywhere in the world with the same quality and precision, transforming us from a local manufacturer into a global solution partner." : "Ürünlerimizi kargoya uygun, akıllıca tasarlanmış demonte (flat-pack) yapılarla kurguluyoruz. Bu teknolojik yaklaşım, tasarımlarımızın dünyanın her noktasına aynı kalite ve hassasiyetle ulaşmasını sağlayarak bizi yerel bir üreticiden global bir çözüm ortağına dönüştürüyor."}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-16 border-t border-[#333535]">
                    <div className="p-16 border border-primary/30 bg-[#121414] relative glass text-center group hover:border-primary transition-colors">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0d0e0f] px-4 group-hover:text-white transition-colors text-primary">
                            <span className="material-symbols-outlined text-4xl">travel_explore</span>
                        </div>
                        <h3 className="text-headline-md text-white uppercase mb-6 mt-4">{isEn ? "Ekols Vision" : "Ekols Vizyonu"}</h3>
                        <p className="text-body-lg text-zinc-300 max-w-3xl mx-auto">
                            {isEn ? "For us, every design is a journey of discovery going from zero to one. By blending engineering intelligence with architectural aesthetics, we are building not just furniture, but the design ecosystem of the future today." : "Bizim için her tasarım, sıfırdan bire giden bir keşif yolculuğudur. Mühendislik zekasını mimari estetikle harmanlayarak, sadece mobilya değil, geleceğin tasarım ekosistemini bugünden kuruyoruz."}
                        </p>
                    </div>
                </div>
                
                <div className="mt-24 text-center pb-24">
                    <Link href={isEn ? "/en" : "/tr"} className="bg-primary text-on-primary px-10 py-5 text-label-technical uppercase transition-colors hover:bg-white inline-flex items-center gap-2">
                        {isEn ? "Back to Home" : "Ana Sayfaya Dön"} <span className="material-symbols-outlined !text-sm">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    </div>
  );
}
