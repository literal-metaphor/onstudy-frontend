import { MouseParallaxChild, MouseParallaxContainer } from "react-parallax-mouse"
import { Tilt } from "react-tilt"
import {motion, useAnimation, useInView, } from "framer-motion"
import { useEffect, useRef } from "react"

const Landing = () => {
  const heroRef = useRef(null);
  const heroIsInView = useInView(heroRef, { once: true });
  const heroControl = useAnimation();

  const fiturCard1Ref = useRef(null);
  const fiturCard1IsInView = useInView(fiturCard1Ref, { once: true });
  const fiturCard1Control = useAnimation();
  const fiturCard2Ref = useRef(null);
  const fiturCard2IsInView = useInView(fiturCard2Ref, { once: true });
  const fiturCard2Control = useAnimation();
  const fiturCard3Ref = useRef(null);
  const fiturCard3IsInView = useInView(fiturCard3Ref, { once: true });
  const fiturCard3Control = useAnimation();

  useEffect(() => {
    if (heroIsInView) {
      heroControl.start("visible");
    }
    if (fiturCard1IsInView) {
      fiturCard1Control.start("visible");
    }
    if (fiturCard2IsInView) {
      fiturCard2Control.start("visible");
    }
    if (fiturCard3IsInView) {
      fiturCard3Control.start("visible");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heroIsInView, fiturCard1IsInView, fiturCard2IsInView, fiturCard3IsInView]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="tw-bg-[#F8F9FA]">
      {/* Header and navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-4 poppins">
        <div className="container-fluid">
          <a className="d-flex justify-content-center align-items-center navbar-brand" href="">
            <img
              src="Landing/Logo.png"
              alt="onStudy Logo"
              className="rounded-circle me-4 tw-w-[40px] tw-h-[40px]"
            />
            <h2 className="fw-bold fs-2 poppins">onStudy</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto my-4 my-lg-0">
              <li className="nav-item mx-2">
                <a className="nav-link" href="#hero">Beranda</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#fitur">Fitur</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#testimonial">Testimonial</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#faq">FAQ</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link" href="#footer">Tentang & Kontak</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="roboto">
        {/* Hero section */}
        <div className="tw-h-[1px] my-4"/>
        <MouseParallaxContainer globalFactorX={0.1} globalFactorY={0.1}>
        <section ref={heroRef} id="hero" className="container">
          <div className="row pe-lg-5">
            <MouseParallaxChild factorX={0.1} factorY={0.1} className="col-lg-6 d-flex flex-column justify-content-center align-items-center order-2 order-lg-2">
              <motion.div variants={{hidden: {opacity: 0, x: -50}, visible: {opacity: 1, x: 0}}}initial="hidden" animate={heroControl} transition={{duration: 0.5, delay: 0.5}}>
                <h1 className="fw-medium fs-1 poppins px-4 px-lg-0 mb-4 text-center text-lg-start">Belajar jadi lebih seru dengan <span className="fw-semibold tw-text-[#28A745]">onStudy</span>!</h1>
                <p className="mb-4 px-4 px-lg-0 tw-text-justify">
                  Belajar hal baru seharusnya menjadi pengalaman yang <span className="fw-bold">mengasyikkan</span>, namun pada kenyataannya, seringkali <span className="fw-bold text-danger">berbanding terbalik</span>. Dengan <span className="fw-semibold tw-text-[#28A745]">onStudy</span>, kamu dapat menciptakan lingkungan belajar yang <span className="fw-bold">menarik</span>, <span className="fw-bold">interaktif</span>, dan <span className="fw-bold">efektif</span>. 📚✨
                </p>
                <div className="d-flex justify-content-center justify-content-lg-start align-items-center align-self-lg-start px-3 px-lg-0">
                  <a href={`${window.location.origin}/auth`} className="btn btn-lg fs-6 mx-2 mx-lg-0 me-lg-4 tw-text-white btn-success">Coba sekarang!</a>
                  <a href="#fitur" className="btn btn-lg fs-6 mx-2 mx-lg-0 btn-outline-success">Lihat lebih lanjut</a>
                </div>
              </motion.div>
            </MouseParallaxChild>
            <MouseParallaxChild factorX={1} factorY={0.5} className="col-lg-6 d-flex flex-column justify-content-center align-items-center order-1 order-lg-2 mb-4 mb-lg-0">
              <motion.div variants={{hidden: {opacity: 0, x: 50}, visible: {opacity: 1, x: 0}}}initial="hidden" animate={heroControl} transition={{duration: 0.5, delay: 1}}>
                <img src="Landing/Hero.svg" alt="Hero Image" className="tw-w-[280px] tw-h-[280px] align-self-lg-end" />
              </motion.div>
            </MouseParallaxChild>
          </div>
        </section>
        </MouseParallaxContainer>

        {/* Fitur section */}
        <div className="tw-h-[1px] my-5"/><div className="tw-h-[1px] my-5"/>
        <section id="fitur" className="container">
          <h1 className="fw-medium fs-1 poppins text-center text-lg-start pb-2">Fitur-fitur <span className="fw-semibold tw-text-[#28A745]">onStudy</span></h1>
          <p className="mb-4 text-center text-lg-start">Kamu bakal dapet apa aja?</p>
          <br/>
          <div className="row">
            <motion.div ref={fiturCard1Ref} variants={{hidden: {opacity: 0, scale: 0}, visible: {opacity: 1, scale: 1}}}initial="hidden" animate={fiturCard1Control} transition={{duration: 0.5, delay: window.innerWidth < 768 ? 0.5 : 0.5}} className="col-12 col-lg-4 d-flex justify-content-center align-content-center">
              <Tilt className="card me-lg-4 mb-lg-0 mb-4 mx-4 mx-lg-0 tw-h-fit tw-w-[30rem] tw-bg-gradient-to-b tw-from-[#FBCA6B] tw-to-[#fff]">
                <img src="Landing/Fitur1.svg" className="card-img-top p-4 tw-w-[200px] tw-h-[200px] tw-m-auto" alt="Ruang kelas virtual"/>
                <div className="card-body">
                  <h5 className="fw-medium fs-5 card-title poppins fw-bold mb-3">Ruang Kelas Virtual</h5>
                  <p className="card-text opacity-50 tw-text-justify">Semua fitur yang kamu butuhin di <span className="fw-bold">ruang kelas</span>, mulai dari <span className="fw-bold">pematerian</span>, <span className="fw-bold">tugas</span>, dan <span className="fw-bold">kuis berwaktu</span>!</p>
                </div>
              </Tilt>
            </motion.div>
            <motion.div ref={fiturCard2Ref} variants={{hidden: {opacity: 0, scale: 0}, visible: {opacity: 1, scale: 1}}}initial="hidden" animate={fiturCard2Control} transition={{duration: 0.5, delay: window.innerWidth < 768 ? 0.5 : 1}} className="col-12 col-lg-4 d-flex justify-content-center align-content-center">
              <Tilt className="card me-lg-4 mb-lg-0 mb-4 mx-4 mx-lg-0 tw-h-fit tw-w-[30rem] tw-bg-gradient-to-b tw-from-[#B8C7FF] tw-to-[#fff]">
                <img src="Landing/Fitur2.svg" className="card-img-top p-4 tw-w-[200px] tw-h-[200px] tw-m-auto" alt="Forum guru dan siswa"/>
                <div className="card-body">
                  <h5 className="fw-medium fs-5 card-title poppins fw-bold mb-3">Forum Guru dan Siswa</h5>
                  <p className="card-text opacity-50 tw-text-justify">Bingung ngerjain tugas yang <span className="fw-bold">susah</span>? Sekarang kamu bisa <span className="fw-bold">diskusi</span> bersama <span className="fw-bold">guru</span> dan <span className="fw-bold">teman</span> secara <span className="fw-bold">online</span>!</p>
                </div>
              </Tilt>
            </motion.div>
            <motion.div ref={fiturCard3Ref} variants={{hidden: {opacity: 0, scale: 0}, visible: {opacity: 1, scale: 1}}}initial="hidden" animate={fiturCard3Control} transition={{duration: 0.5, delay: window.innerWidth < 768 ? 0.5 : 1.5}} className="col-12 col-lg-4 d-flex justify-content-center align-content-center">
              <Tilt className="card me-lg-4 mb-lg-0 mb-4 mx-4 mx-lg-0 tw-h-fit tw-w-[30rem] tw-bg-gradient-to-b tw-from-[#EBCC99] tw-to-[#fff]">
                <img src="Landing/Fitur3.svg" className="card-img-top p-4 tw-w-[200px] tw-h-[189px] tw-m-auto" alt="Rapor virtual"/>
                <div className="card-body">
                  <h5 className="fw-medium fs-5 card-title poppins fw-bold mb-3">Rapor Virtual</h5>
                  <p className="card-text opacity-50 tw-text-justify">Bangun <span className="fw-bold">integritas</span> pendidikanmu dengan melacak <span className="fw-bold">progress</span> pembelajaranmu di fitur rapor virtual <span className="fw-semibold tw-text-[#28A745]">onStudy</span>!</p>
                </div>
              </Tilt>
            </motion.div>
          </div>
        </section>

        {/* Testimonial section */}
        <div className="tw-h-[1px] my-5"/><div className="tw-h-[1px] my-5"/>
        <section id="testimonial" className="container">
          <div className="mb-4 d-flex flex-column justify-content-center align-items-center">
            <h1 className="fw-medium fs-1 poppins text-center pb-2">Testimonial <span className="fw-semibold tw-text-[#28A745]"> onStudy</span></h1>
            <p className="text-center">Apa kata orang-orang?</p>
          </div>
          <br/>
          <div className="row d-flex justify-content-center align-items-start">
            <div className="col-12 col-lg-4 mb-5 mb-lg-0 d-flex flex-column justify-content-center align-items-center">
              <img src="Landing/Andy.svg" alt="Andy Nugroho" className="tw-w-[240px] tw-h-[240px] mb-4 rounded-circle"/>
              <h2 className="fw-medium fs-2 text-center">Andy Nugroho</h2>
              <p className="text-center mb-4">Alumni Inexistentia High School</p>
              <p className="tw-text-justify px-4 fst-italic">“Awal-awal aku liat <span className="fw-bold tw-text-[#28A745]">onStudy</span>, aku mikirnya itu kayak aplikasi bimbel yang pasaran. Yang bedain <span className="fw-bold tw-text-[#28A745]">onStudy</span> dari bimbel online yang lain itu <span className="fw-bold">approach</span> yang diambil. Daripada cuma nyediain pematerian, <span className="fw-bold tw-text-[#28A745]">onStudy</span> itu kayak mensimulasikan kelas virtual yang mana <span className="fw-bold">guru</span> dan <span className="fw-bold">murid</span> itu bisa tanya jawab, interaksi, dan lain lain. Jadi pembelajarannya <span className="fw-bold">seru</span> dan ga monoton.”</p>
              <div className="d-flex justify-content-center align-items-center pt-4">
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/Star.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5 mb-lg-0 d-flex flex-column justify-content-center align-items-center">
              <img src="Landing/Edi.svg" alt="Edi Hartono" className="mb-4 rounded-circle tw-w-[240px] tw-h-[240px]"/>
              <h2 className="fw-medium fs-2 text-center">Edi Hartono</h2>
              <p className="text-center mb-4">Guru Sains di SMA Pejuang Bangsa</p>
              <p className="tw-text-justify px-4 fst-italic">“Sebagai seorang guru, <span className="fw-bold tw-text-[#28A745]">onStudy</span> bantu pekerjaan saya banget.  Sebelumnya, murid-murid kalo bingung sama materi saya pasti kaburnya ke internet, terus ngerjain tugasnya modal copas, walaupun dari fundamentalnya masih ga paham. Semenjak pake <span className="fw-bold tw-text-[#28A745]">onStudy</span>, murid-murid jadi ada <span className="fw-bold">sarana</span> buat <span className="fw-bold">diskusi</span> dan <span className="fw-bold">tanya jawab</span>, baik sama saya atau sesama temennya.”</p>
              <div className="d-flex justify-content-center align-items-center pt-4">
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/Star.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5 mb-lg-0 d-flex flex-column justify-content-center align-items-center">
              <img src="Landing/Alicia.svg" alt="Alicia Anastasya" className="mb-4 rounded-circle tw-w-[240px] tw-h-[240px]"/>
              <h2 className="fw-medium fs-2 text-center">Alicia Anastasya</h2>
              <p className="text-center mb-4">Jurnalis Independen</p>
              <p className="tw-text-justify px-4 fst-italic">“I first heard about <span className="fw-bold tw-text-[#28A745]">onStudy</span> when I was searching for Google Classroom alternatives. <span className="fw-bold tw-text-[#28A745]">onStudy</span> is very similar in that regard, but it added more features within. Some of which are <span className="fw-bold">timed quizzes</span>, <span className="fw-bold">forum</span> where students can perform peer-to-peer <span className="fw-bold">collaboration</span>, and other features people should try themselves. Overall, a fine if not a <span className="fw-bold">good alternative</span> to Google Classroom.”</p>
              <div className="d-flex justify-content-center align-items-center pt-4">
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/StarFill.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
                <img src="Landing/Star.svg" alt="Star Fill" className="me-2 tw-w-[24px] tw-h-[24px]"/>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <div className="tw-h-[1px] my-5"/><div className="tw-h-[1px] my-5"/>
        <section id="faq" className="container">
          <div className="row">
            <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
              <Tilt><img src="Landing/FAQ.svg" alt="FAQ Image" className="d-lg-block d-none tw-w-[360px] tw-h-[360px]"/></Tilt>
              <Tilt><img src="Landing/FAQ.svg" alt="FAQ Image" className="d-lg-none mb-4 tw-w-[240px] tw-h-[240px]"/></Tilt>
            </div>
            <div className="col-12 col-lg-6 flex-column">
              <h1 className="fw-medium fs-1 px-4 mb-4 text-center">Pertanyaan Teratas (FAQ)</h1>
              <br/>
              <div className="accordion px-4" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="fw-medium fs-2 accordion-header">
                    <button className="fw-semibold accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      Apa bedanya aplikasi ini dengan aplikasi kelas virtual lainnya?
                    </button>
                  </h2>
                  <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Perbedaan paling mendasar adalah pendekatan yang kami ambil. <span className="fw-bold tw-text-[#28A745]">onStudy</span> tidak hanya menjadi tempat di mana guru memberikan tugas dan siswa mengerjakan, tapi juga menjadi forum tanya jawab, sebagai kuis online, tempat untuk mendeteksi progress akademis para murid, dan lainnya.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="fw-medium fs-2 accordion-header">
                    <button className="fw-semibold accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      Apa yang dimaksud dengan rapor virtual?
                    </button>
                  </h2>
                  <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Progress belajar masing-masing siswa akan selalu dilacak oleh <span className="fw-bold tw-text-[#28A745]">onStudy</span> dan bisa dilihat pada tampilan profil siswa.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="fw-medium fs-2 accordion-header">
                    <button className="fw-semibold accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      Berapa kuota maksimal tiap kelas?
                    </button>
                  </h2>
                  <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Setiap kelas mempunyai satu guru dan berapapun jumlah siswa.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <div className="tw-h-[1px] my-5"/><div className="tw-h-[1px] my-5"/>
      <footer id="footer" className="container-fluid bg-black poppins" style={{padding: "4rem 8vw 4rem 8vw"}}>
        <div className="row">
          <div className="col-12 col-lg-6 order-1">
            <div className="d-flex justify-content-center justify-content-lg-start align-items-center">
              <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-start">
                <div className="mb-4 d-flex justify-content-center align-items-center">
                  <img src="Landing/Logo.png" alt="Logo" className="rounded-circle me-4 tw-w-[40px] tw-h-[40px]"/>
                  <a className="text-white text-decoration-none" href="#"><h2 className="fw-medium fs-2 fw-bold">onStudy</h2></a>
                </div>
                <div className="mb-5 d-flex justify-content-start align-items-center">
                  <a className="m-4 m-lg-0 me-lg-4 tw-w-[24px] tw-h-[24px]" href="#"><img src="Landing/IG.svg" alt="Instagram"/></a>
                  <a className="m-4 m-lg-0 me-lg-4 tw-w-[24px] tw-h-[24px]" href="#"><img src="Landing/Twitter.svg" alt="Twitter"/></a>
                  <a className="m-4 m-lg-0 me-lg-4 tw-w-[24px] tw-h-[24px]" href="#"><img src="Landing/YT.svg" alt="YouTube"/></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 order-2 mb-4 mb-lg-0">
            <div className="d-flex justify-content-around align-items-start">
              <div className="d-flex flex-column justify-content-center align-items-center mx-2 mx-lg-4">
                <h4 className="fw-medium fs-4 text-white mb-4 poppins">Kebijakan</h4>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Layanan</a>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Privasi</a>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Panduan<br/>Komunitas</a>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center mx-2 mx-lg-4">
                <h4 className="fw-medium fs-4 text-white mb-4 poppins">Bantuan</h4>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Blog</a>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Help Desk</a>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Forum Teknis</a>
              </div>
              <div className="d-none d-lg-flex flex-column justify-content-center align-items-center mx-2 mx-lg-4">
                <h4 className="fw-medium fs-4 text-white mb-4 poppins">Kontak</h4>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Instagram</a>
                <a href="#" className="my-2 text-white text-decoration-none text-center">Twitter / X</a>
                <a href="#" className="my-2 text-white text-decoration-none text-center">YouTube</a>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 order-3 mb-4 mb-lg-0 d-flex flex-column justify-content-center align-items-center d-lg-block">
            <div className="tw-text-justify text-white">
              <h4 className="fw-medium fs-4 text-white mb-4 poppins">Kelompok 4 MejaKita Academy 2024:</h4>
              <ul className="text-white">
                <li className="mb-2">Neila Adenin Syafitri (UI/UX + Project Lead)</li>
                <li className="mb-2">M. Edu Firman Rizqi Ramadhan (Frontend Developer)</li>
                <li className="mb-2">Rezky Naufal Ramadhan (Backend Developer)</li>
                <li className="mb-2">Drajad Kusuma Adi (Backend Developer)</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing