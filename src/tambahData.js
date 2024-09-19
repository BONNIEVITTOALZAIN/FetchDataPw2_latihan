// TambahMahasiswa.js
import './tmbhm.css';
import React, { useState, useEffect } from 'react';

const TambahMahasiswa = () => {
  const [npm, setNpm] = useState('');
  const [nama, setNama] = useState('');
  const [tempatLahir, setTempatLahir] = useState('');
  const [tanggalLahir, setTanggalLahir] = useState('');
  const [alamat, setAlamat] = useState('');
  const [prodiId, setProdiId] = useState('');
  const [prodiList, setProdiList] = useState([]);

  useEffect(() => {
    const fetchProdi = async () => {
      try {
        const response = await fetch('https://project-apiif3b.vercel.app/api/api/prodi'); 
        if (!response.ok) {
          throw new Error('Failed to fetch prodi');
        }
        const data = await response.json();
        setProdiList(data.result); 
      } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
      }
    };

    fetchProdi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      npm,
      nama,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      alamat,
      prodi_id: prodiId,
    };

    try {
      const response = await fetch('https://project-apiif3b.vercel.app/api/api/mahasiswa/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create mahasiswa');
      }

      const result = await response.json();
      alert('Mahasiswa berhasil ditambahkan!');
      console.log(result);
      
      setNpm('');
      setNama('');
      setTempatLahir('');
      setTanggalLahir('');
      setAlamat('');
      setProdiId('');
    } catch (error) {
      console.error(error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Tambah Mahasiswa</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>NPM:</label>
          <input 
            type="text" 
            value={npm} 
            onChange={(e) => setNpm(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Nama:</label>
          <input 
            type="text" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Tempat Lahir:</label>
          <input 
            type="text" 
            value={tempatLahir} 
            onChange={(e) => setTempatLahir(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Tanggal Lahir:</label>
          <input 
            type="date" 
            value={tanggalLahir} 
            onChange={(e) => setTanggalLahir(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Alamat:</label>
          <input 
            type="text" 
            value={alamat} 
            onChange={(e) => setAlamat(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Prodi:</label>
          <select 
            value={prodiId} 
            onChange={(e) => setProdiId(e.target.value)} 
            required
          >
            <option value="">Pilih Prodi</option>
            {prodiList.map((prodi) => (
              <option key={prodi.id} value={prodi.id}>
                {prodi.nama}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Tambah Mahasiswa</button>
      </form>
    </div>
  );
};

export default TambahMahasiswa;
