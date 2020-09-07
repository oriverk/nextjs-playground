import { useAmp } from 'next/amp'

export function CustomOptimizedImages({ src, alt, ...otherProps }) {
  const sliced = src.slice(0, 1) === '/' ? src.slice(1) : src
  const split = sliced.split('/')[0] === 'assets' ? sliced.replace('assets/', '') : sliced
  // => posts/hoge.jpg
  const optimizedAlt = alt === null ? 'image' : alt
  
  const isAmp = useAmp()
  return (
    <React.Fragment>
      <div>image: {isAmp ? 'amp': 'normal'}</div>
      <div className='optimized relative'>
          <amp-img
            alt={optimizedAlt}
            width='550'
            height='368'
            src={require(`@public/assets/${split}?{sizes:[640,960,1200,1800], format: 'webp' }`).src}
            >
            {/* src={require(`@public/assets/${split}?webp`)} */}
            <amp-img
              alt={optimizedAlt}
              fallback=''
              width='550'
              height='368'
              src={require(`@public/assets/${split}?resize`).src}
            >
            </amp-img>
          </amp-img>
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