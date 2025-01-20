export async function getLibros() {

    try{
      const res = await fetch('http://localhost:3000/api/libros', { cache: 'no-store'})
      return res.json()
    }catch(error){
      throw new Error('Failed to fetch data')
    }
  }
  