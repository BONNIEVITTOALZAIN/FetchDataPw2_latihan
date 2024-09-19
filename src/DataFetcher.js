import './mahasiswa.css';
import React, { useEffect, useState } from 'react';

const Fakultas = () => {
  const [mahasiswa, setMahasiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMahasiswa = async () => {
      try {
        const response = await fetch('https://project-apiif3b.vercel.app/api/api/mahasiswa');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        if (Array.isArray(data.result)) {
          setMahasiswa(data.result);
        } else {
          throw new Error('Data.result is not an array');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMahasiswa();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Daftar Mahasiswa</h1>
      <div className="table">
        <div className="table-header">
          <div>NPM</div>
          <div>Nama</div>
          <div>Prodi</div>
        </div>
        {mahasiswa.length > 0 ? (
          mahasiswa.map((item) => (
            <div className="table-row" key={item.id}>
              <div>{item.npm}</div>
              <div>{item.nama}</div>
              <div>{item.prodi.nama}</div>
            </div>
          ))
        ) : (
          <div className="table-row">Tidak ada data yang tersedia.</div>
        )}
      </div>
    </div>
  );
};

export default Fakultas;
