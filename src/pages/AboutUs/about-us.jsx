import React from 'react'
import './about-us.css'
import cafeImg from '../../assets/image/green-cafe.jpg'
import pic1 from '../../assets/image/garifulina.jpg'
import pic2 from '../../assets/image/gingerbread latte.jpg'
import pic3 from '../../assets/image/gingerbread.jpg'
import feature1 from '../../assets/icon/coffee-beans.svg'
import feature2 from '../../assets/icon/awward.svg'
import feature3 from '../../assets/icon/clock.svg'
import feature4 from '../../assets/icon/experience.svg'

const timeline = [
  { year: '2020 Januari', text: 'Nova Cafe berdiri dan membuka gerai pertama.' },
  { year: '2021 Juli', text: 'Menu spesial diperkenalkan dan penjualan meningkat.' },
  { year: '2022 September', text: 'Buka cabang kedua dengan interior baru.' },
  { year: '2023 Februari', text: 'Mulai program kopi berkelanjutan.' },
]

const AboutUs = () => {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="about-hero-inner">
          <h1>Tentang Nova Cafe</h1>
          <p>Lebih dari sekadar kopi, kami adalah tempat dimana cerita dimulai dan persahabatan terajut.</p>
        </div>
      </section>

      <section className="about-content container">
        <div className="about-text">
          <h1>Cerita Kami</h1>
          <p>
            Nova Cafe dimulai dari sebuah mimpi sederhana: menyediakan pengalaman ngopi yang hangat dan
            berkualitas. Dengan biji kopi pilihan dan barista berpengalaman, kami menyajikan minuman yang
            konsisten dan suasana yang mengundang untuk berkumpul.
          </p>
          <p>
            Sejak pembukaan, kami terus berkembang sambil tetap menjaga nilai-nilai kebersamaan, kualitas,
            dan pelayanan ramah. Setiap cangkir menceritakan sedikit dari perjalanan kami.
          </p>
        </div>

        <div className="about-images">
          <div className="about-grid">
            <img src={cafeImg} alt="Nova Cafe" className='about-main'/>
            <img src={pic1} alt="gallery 1" className='about-grid-pic1'/>
            <img src={pic2} alt="gallery 2" className='about-grid-pic2'/>
            <img src={pic3} alt="gallery 3" className='about-grid-pic3'/>
          </div>
        </div>
      </section>

      <section className="timeline container">
        <h3>Perjalanan Kami</h3>
        <div className="timeline-wrap">
          <div className="line" />
          <div className="events">
            {timeline.map((t, i) => (
              <div key={i} className={`event ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="event-box">
                  <strong>{t.year}</strong>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="feature">
          <img src={feature1} alt="Premium" />
          <h4>Premium Quality</h4>
          <p>Bijian pilihan, racikan ahli.</p>
        </div>
        <div className="feature">
          <img src={feature2} alt="Award" />
          <h4>Award winning</h4>
          <p>Kualitas yang diakui.</p>
        </div>
        <div className="feature">
          <img src={feature3} alt="Quick" />
          <h4>Quick Service</h4>
          <p>Pesan cepat, siap santap.</p>
        </div>
        <div className="feature">
          <img src={feature4} alt="Baristas" />
          <h4>Expert Baristas</h4>
          <p>Barista berpengalaman.</p>
        </div>
      </section>
    </main>
  )
}

export default AboutUs