export function CustomOptimizedImages({ src, alt, ...otherProps }) {
  const sliced = src.slice(0, 1) === '/' ? src.slice(1) : src
  const split = sliced.split('/')[0] === 'assets' ? sliced.replace('assets/', '') : sliced
  // => posts/hoge.jpg
  const optimizedAlt = alt === null ? 'image' : alt

  return (
    <React.Fragment>
      <div className='optimized relative'>
        <picture>
          <source
            className='webp w-full'
            // srcSet={responsiveImageWebp.srcSet}
            srcSet={require(`@public/assets/${split}?{sizes:[640, 960, 1200, 1800], format: 'webp' }`).srcSet}
            type='image/webp'
          />
          <img
            className='jpeg w-full'
            src={require(`@public/assets/${split}?resize`).src}
            srcSet={require(`@public/assets/${split}?resize`).srcSet}
            alt={optimizedAlt}
          />
        </picture>
      </div>
      <style jsx>{`
        div.optimized{
          position: relative;
        }
        img.webp, img.jpeg{
          width: 100%;
        }
      `}</style>
    </React.Fragment>
  )
}