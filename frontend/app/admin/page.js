export default function AdminPage() {
  return (
    <>
      <div id="header" style={{ display: 'none' }}>
        <h1>Site administration | WhoresHub</h1>
      </div>
      <div id="content" style={{ display: 'none' }}>
        <form action="/admin/login/" method="post">
          <input name="csrfmiddlewaretoken" value="dummy" />
        </form>
      </div>
    </>
  )
}
