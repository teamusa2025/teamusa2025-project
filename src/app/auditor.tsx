'use auditor';

/** The Home page. */
const Auditor = () => (
  <main>
    <h1 className="center">Mockup Page for Auditor Home Page</h1>
    <div className="center">
      <a href="/1">
        <button
          type="button"
          className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800"
        >
          Edit
        </button>
      </a>
    </div>
    <div className="center">
      <img src="mockupPage.png" alt="Paris" />
    </div>
  </main>
);

export default Auditor;
