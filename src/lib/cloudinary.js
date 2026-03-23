import { Cloudinary } from '@cloudinary/url-gen'
import { fill, fit } from '@cloudinary/url-gen/actions/resize'
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity'
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality'
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format'

// Instancia del cliente
export const cld = new Cloudinary({
    cloud: {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
    }
})

/**
 * Sube una imagen a Cloudinary via upload API (unsigned).
 * @param {File} file - Archivo de imagen
 * @param {string} carpeta - Carpeta destino en Cloudinary
 * @returns {Promise<string>} public_id para guardar en Supabase
 */
export const uploadImage = async (file, carpeta = 'general') => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formData.append('folder', carpeta)

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: formData }
    )

    const data = await res.json()
    if (data.error) throw new Error(data.error.message)

    return data.public_id
}

/**
 * Genera una URL optimizada a partir de un public_id de Cloudinary.
 * @param {string} publicId - El public_id guardado en Supabase
 * @param {object} opciones - { width, height, mode: 'fill' | 'fit' }
 * @returns {string|null} URL de la imagen transformada
 */
export const getImage = (publicId, opciones = {}) => {
    if (!publicId) return null

    const {
        width = 400,
        height = 400,
        mode = 'fill'
    } = opciones

    const image = cld.image(publicId)

    image
        .resize(
            mode === 'fill'
                ? fill().width(width).height(height).gravity(autoGravity())
                : fit().width(width).height(height)
        )
        .quality(autoQuality())
        .format(autoFormat())

    return image.toURL()
}
