import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const dashboardTemplate = (albums)=> html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper"></ul>
    ${albums.length > 0 ? albums.map(album=>cardTemplate(album))
    : html `<h2>There are no albums added yet.</h2>`}
    </section>
`
const cardTemplate = (album)=> html `
<li class="card">
    <img src=${album.imageUrl}/>
    <p>
        <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${album.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
    <a class="details-btn" href="/details/${album._id}">Details</a>
</li>
`

export async function showDashboard(ctx){
    const albums = await getAll()
    ctx.render(dashboardTemplate(albums));
}