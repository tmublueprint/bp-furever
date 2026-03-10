import './style.css';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

function Blog() {
  return (
      <main className="facebook-page">
        <NavBar />
        <section className="facebook-hero">
          <div className="facebook-hero-container">
            <h1 className="facebook-hero-title">Our Facebook</h1>
          </div>
        </section>
        
        <div className="facebook-wrapper">
          {/* Facebook embed */
          /* This is temp, to be either replaced or refined later */}
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFEVRWR%2F&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
            title="FurEver Facebook Page"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
        <Footer />
      </main>
  )
}

export default Blog
