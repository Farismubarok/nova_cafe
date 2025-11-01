import React from "react";
import "./Contact.css";
import Phone from "../../assets/icon/green phone.svg";
import Mail from "../../assets/icon/mail.svg";
import Clock from "../../assets/icon/clock.svg";
import MapPin from "../../assets/icon/locate.svg";
import imgBg from "../../assets/image/herobg.jpg"

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Header Section */}
      <section className="contact-header">
        <h2>Hubungi Kami</h2>
        <p>Ada Pertanyaan? Kami siap membantu</p>
      </section>

      {/* Contact Content Section */}
      <section className="contact-main">
        <div className="contact-left">
          <div className="contact-card">
            <img src={Phone} alt="Telephone" className="icon" />
            <div>
              <h4>Telephone</h4>
              <p>+62 831-2250-5336</p>
              <p>+62 814-1326-3302</p>
            </div>
          </div>

          <div className="contact-card">
            <img src={Mail} alt="Email" className="icon" />
            <div>
              <h4>E-mail</h4>
              <p>support@novacafe.com</p>
            </div>
          </div>

          <div className="contact-card">
            <img src={Clock} alt="Jam Operasional" className="icon" />
            <div>
              <h4>Jam Operasional</h4>
              <p>09.00 - 23.00 WIB</p>
            </div>
          </div>

          <div className="contact-card">
            <img src={MapPin} alt="Alamat" className="icon" />
            <div>
              <h4>Alamat</h4>
              <p>
                Jl. Margonda Raya, Kecamatan Beji, Kota Depok, Jawa Barat 16424
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="contact-right">
          <img src={imgBg} alt="Nova Cafe Interior" />
        </div>
      </section>
    </div>
  );
};

export default Contact;
