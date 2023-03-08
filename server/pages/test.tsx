export default function Index() {
  return (
    <div>
      <p>
        To test the CORS route, open the console in a new tab on a different domain and make a POST
        / GET / OPTIONS request to <b>/api/cors</b>. Using a different method from those mentioned
        will be blocked by CORS
      </p>
      <a href="/api/v3/audios?lang=ru" target="_blank">
        /api/v3/audios?lang=ru
      </a>
      <hr />
      <a href="/api/v3/audios?lang=en" target="_blank">
        /api/v3/audios?lang=en
      </a>

      <hr />
      <a href="/api/v3/library?lang=en" target="_blank">
        /api/v3/library?lang=en
      </a>

      <hr />
      <a href="/api/v3/library?lang=ru" target="_blank">
        /api/v3/library?lang=ru
      </a>

      <hr />
      <a href="/api/v3/library?lang=ru&id=6063996587bafbb125aefe33" target="_blank">
        /api/v3/library?lang=ru&id=6063996587bafbb125aefe33
      </a>

      <hr />
      <a href="/api/v3/library?lang=en&id=6063a0a687bafbb125af01aa" target="_blank">
        /api/v3/library?lang=en&id=6063a0a687bafbb125af01aa
      </a>
    </div>
  );
}
