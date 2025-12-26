import { useState } from 'react';

function Admin ()
{
    // Estado para el formulario
    const [ formData, setFormData ] = useState( {
        nombre: '',
        precio: '',
        categoria: 'Papelería', // Valor por defecto
        stock: '',
        imagen_url: ''
    } );

    const handleChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) =>
    {
        setFormData( {
            ...formData,
            [ e.target.name ]: e.target.value
        } );
    };

    const handleSubmit = async ( e: React.FormEvent ) =>
    {
        e.preventDefault(); // Evita que la página se recargue

        try
        {
            const response = await fetch( 'http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( {
                    ...formData,
                    precio: Number( formData.precio ), // Convertimos a número
                    stock: Number( formData.stock )
                } )
            } );

            if ( response.ok )
            {
                alert( '✅ Producto creado con éxito' );
                // Limpiar formulario
                setFormData( { nombre: '', precio: '', categoria: 'Papelería', stock: '', imagen_url: '' } );
            } else
            {
                alert( '❌ Error al crear producto' );
            }
        } catch ( error )
        {
            console.error( error );
            alert( 'Error de conexión' );
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Panel de Administración</h1>

            <form onSubmit={ handleSubmit } className="bg-white p-6 rounded shadow-md space-y-4">
                <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Producto</h2>

                {/* Nombre */ }
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
                    <input
                        type="text"
                        name="nombre"
                        value={ formData.nombre }
                        onChange={ handleChange }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                {/* Precio y Stock (en la misma línea) */ }
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Precio ($)</label>
                        <input
                            type="number"
                            name="precio"
                            value={ formData.precio }
                            onChange={ handleChange }
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={ formData.stock }
                            onChange={ handleChange }
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        />
                    </div>
                </div>

                {/* Categoría */ }
                <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría</label>
                    <select
                        name="categoria"
                        value={ formData.categoria }
                        onChange={ handleChange }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded bg-white"
                    >
                        <option>Papelería</option>
                        <option>Escolar</option>
                        <option>Oficina</option>
                        <option>Computación</option>
                        <option>Regalería</option>
                    </select>
                </div>

                {/* URL de Imagen (Por ahora manual) */ }
                <div>
                    <label className="block text-sm font-medium text-gray-700">URL de Imagen</label>
                    <input
                        type="text"
                        name="imagen_url"
                        placeholder="https://ejemplo.com/foto.jpg"
                        value={ formData.imagen_url }
                        onChange={ handleChange }
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Guardar Producto
                </button>
            </form>
        </div>
    );
}

export default Admin;