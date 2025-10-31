import React from 'react'
import '../Card/card.css'
import add from '../../assets/icon/shopping bag.svg'

const cardmenu = ({image, name, price, onAddToCart}) => {
  return (
    <div className='card'>
        <div className="w-64 bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
      {/* Gambar Menu */}
      <img src={image} alt={name} className="object-cover"/>
      {/* Konten Menu */}
      <div className="text-center">
        <h3 className="text">{name}</h3>
        <p className="price">Rp {price}</p>
        {/* Tombol Tambah Keranjang */}
        <button
          onClick={onAddToCart}
          className="bautton-cart">
          <img src= {add} alt="add" /> Tambah ke Keranjang
        </button>
      </div>
    </div>
    </div>
  )
}

export default cardmenu