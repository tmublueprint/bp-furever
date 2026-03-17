import './style.css';
import PDFcard from '../../components/PDFCard/PDFCard';

function Admin() {
  return (
    <>
      <div id="admin-container">
        <div id="admin-input-container">
          <div>
            <p>Cover Image</p>
            <input type="file" accept="image/*"></input>
          </div>
          <div id="title-input-container">
            <p>Title</p>
            <input type="text" style={{height:16,margin:"auto 0 auto 10px"}}></input>
          </div>
          <div id="summary-input-container">
            <p>Summary</p>
            <input type="text" style={{height:16,margin:"auto 0 auto 10px"}}></input>
          </div>
          <div>
            <p>PDF</p>
            <input type="file" accept="application/pdf"></input>
          </div>
          <p>Or</p>
          <div>
            <p>Hyperlink</p>
            <input type="text" accept="application/pdf"></input>
          </div>
        </div>
        <div id="admin-preview-container">
          <PDFcard image="" title="" summary='' link=""/>
        </div>
      </div>
    </>
  )
}

export default Admin
