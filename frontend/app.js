//const API = "http://3.238.141.181:3000";

const API = "http://localhost:3000";

async function loadDashboard(){

  try {

    // ===================================
    // FETCH DATA
    // ===================================

    const [
      teamRes,
      standingsRes,
      matchesRes,
      newsRes,
      playersRes
    ] = await Promise.all([

      fetch(`${API}/api/liverpool`),
      fetch(`${API}/api/standings`),
      fetch(`${API}/api/matches`),
      fetch(`${API}/api/news`),
      fetch(`${API}/api/players`)

    ]);

    const team =
      await teamRes.json();

    const standingsData =
      await standingsRes.json();

    const matchesData =
      await matchesRes.json();

    const newsData =
      await newsRes.json();

    const playersData =
      await playersRes.json();

      playersData.push(

  {
    player: {
      name: "Alexander Isak",
      nationality: "Sweden",
      age: 25,
      photo: "./images/isak.png"
    },
    statistics: [{
      team: { id: 40 },
      games: {
        position: "Attacker",
        appearences: 0,
        rating: "N/A"
      }
    }]
  },

  {
    player: {
      name: "Hugo Ekitike",
      nationality: "France",
      age: 23,
     photo: "./images/ekitike.png"
    },
    statistics: [{
      team: { id: 40 },
      games: {
        position: "Attacker",
        appearences: 0,
        rating: "N/A"
      }
    }]
  }

);

    // ===================================
    // HERO
    // ===================================

    document.getElementById("crest").src =
      team.crest;

    document.getElementById("club-name").innerText =
      team.name;

    document.getElementById("stadium").innerText =
      `🏟 ${team.venue}`;

    document.getElementById("manager").innerText =
      `👔 ${team.coach.name}`;

    // ===================================
// PLAYERS
// ===================================

const players =
  document.getElementById(
    "players-container"
  );

players.innerHTML = "";

const excludedPlayers = [

  "T. Alexander-Arnold",
  "D. Núñez",
  "C. Kelleher",
  "J. Quansah",
  "Marcelo Pitaluga",
  "Calvin Ramsay",
  "Rhys Williams",
  "Fabian Mrozek",
  "H. Elliott",
  "K. Tsimikas",
  "B. Doak",
  "R. Williams",
  "S. van den Berg",
  "Fábio Carvalho",
  "Marcelo",
  "H. Blair",
  "Stefan Bajčetić",
  "Adrián",
  "N. Phillips",
  "James Barry Norris",
  "O. Beck",
  "T. Morton",
  "H. Davies",
  "Kaide Gordon",
  "L. Koumas",
  "B. Clark",
  "Trent Toure Kone Doherty",
  "R. Young",
  "K. Morrison",

];

playersData

  .filter(item => {

    const stats =
      item.statistics.find(
        s => s.team.id === 40
      );

    if(!stats) return false;

    return (

      stats.games.appearences !== null &&

      item.player.age > 16 &&

      stats.games.position !== "Coach" &&

      !excludedPlayers.some(name =>
        item.player.name.includes(name)
      )

    );

  })

  .sort((a, b) => {

    const aStats =
      a.statistics.find(
        s => s.team.id === 40
      );

    const bStats =
      b.statistics.find(
        s => s.team.id === 40
      );

    return (
      (bStats.games.appearences || 0) -
      (aStats.games.appearences || 0)
    );

  })

  .forEach(item => {

    const player =
      item.player;

    const stats =
      item.statistics.find(
        s => s.team.id === 40
      );

    players.innerHTML += `

      <div class="player-card">

        <img
          src="${player.photo}"
          alt="${player.name}"
          class="player-image"
        />

        <h3>
          ${player.name}
        </h3>

        <p>
          ⚽ ${stats.games.position}
        </p>

        <p>
          🌍 ${player.nationality}
        </p>

      </div>

    `;

  });
    // ===================================
    // STANDINGS
    // ===================================

    const standings =
      standingsData.standings[0].table;

    const standingsDiv =
      document.getElementById("standings");

    standingsDiv.innerHTML = "";

    standings.forEach(team => {

        standingsDiv.innerHTML += `

        <div class="
  table-row

  ${team.position <= 4
    ? "ucl"

  : team.position === 5
    ? "uel"

  : team.position === 6
    ? "uecl"

  : team.position >= 18
    ? "relegation"

  : ""}

  ${team.team.name === "Liverpool FC"
    ? "liverpool"
    : ""}
">
            <div class="table-left">

              <img
                src="${team.team.crest}"
                class="table-logo"
              />

              <span>

                ${team.position}.
                ${team.team.name}

              </span>

            </div>

            <span>
              ${team.points} pts
            </span>

          </div>

        `;

      });

    // ===================================
    // METRICS
    // ===================================

    const liverpool =
      standings.find(
        t => t.team.name === "Liverpool FC"
      );

    if (liverpool) {

      document.getElementById("wins").innerText =
        liverpool.won;

      document.getElementById("draws").innerText =
        liverpool.draw;

      document.getElementById("losses").innerText =
        liverpool.lost;

      document.getElementById("points").innerText =
        liverpool.points;

    }

    // ===================================
    // NEXT MATCH
    // ===================================

    const upcomingMatches =
      matchesData.matches.filter(

        match =>

          match.status === "SCHEDULED" ||
          match.status === "TIMED"

      );

    const nextMatchDiv =
      document.getElementById("next-match");

    if (upcomingMatches.length > 0) {
const nextMatch =
  upcomingMatches[0];

nextMatchDiv.innerHTML = `

  <div class="next-match-content">
  ${
  nextMatch.status === "IN_PLAY"
  ? `
    <div class="live-badge">
      🔴 LIVE
    </div>
  `
  : ""
}

    <div class="next-match-teams">

      <div class="next-team">

        <img
          src="${nextMatch.homeTeam.crest}"
          class="next-team-logo"
        />

        <span>
          ${nextMatch.homeTeam.name}
        </span>

      </div>

      <div class="vs-text">
        VS
      </div>

      <div class="next-team">

        <img
          src="${nextMatch.awayTeam.crest}"
          class="next-team-logo"
        />

        <span>
          ${nextMatch.awayTeam.name}
        </span>

      </div>

    </div>

    <div class="competition-row">

      <img
        src="${nextMatch.competition.emblem}"
        class="
         competition-logo
        ${nextMatch.competition.name === "Premier League"
          ? "pl-logo"
          : ""}
"
      />

      <span class="match-venue">

        ${nextMatch.competition.name}

        •

        ${nextMatch.venue || "Anfield"}

      </span>

    </div>

    <p class="kickoff-time">

      Kickoff:
      ${new Date(
        nextMatch.utcDate
      ).toLocaleString()}

    </p>

  </div>

`;
} else {

  nextMatchDiv.innerHTML = `

    <p>
      No upcoming matches found.
    </p>

  `;

}
    // ===================================
    // RECENT MATCHES
    // ===================================

    const recentMatchesDiv =
      document.getElementById(
        "recent-matches"
      );

    recentMatchesDiv.innerHTML = "";

    const finishedMatches =
      matchesData.matches
        .filter(
          match =>
            match.status === "FINISHED"
        )
        .slice(-5)
        .reverse();

    finishedMatches.forEach(match => {

      const isLiverpoolHome =
        match.homeTeam.name === "Liverpool FC";

      const homeGoals =
        match.score.fullTime.home;

      const awayGoals =
        match.score.fullTime.away;

      let resultClass = "draw";

      if (
        (isLiverpoolHome && homeGoals > awayGoals) ||
        (!isLiverpoolHome && awayGoals > homeGoals)
      ) {
        resultClass = "win";
      }

      if (
        (isLiverpoolHome && homeGoals < awayGoals) ||
        (!isLiverpoolHome && awayGoals < homeGoals)
      ) {
        resultClass = "loss";
      }

      recentMatchesDiv.innerHTML += `

  <div class="match ${resultClass}">

    <div class="match-teams">

      <div class="team">

        <img
          src="${match.homeTeam.crest}"
          class="match-logo"
        />

        <span>
          ${match.homeTeam.name}
        </span>

      </div>

      <div class="score">

        ${homeGoals}
        -
        ${awayGoals}

      </div>

      <div class="team">

        <img
          src="${match.awayTeam.crest}"
          class="match-logo"
        />

        <span>
          ${match.awayTeam.name}
        </span>

      </div>

    </div>

  </div>

`;
    });

    // ===================================
    // CURRENT FORM
    // ===================================

    const formDiv =
      document.getElementById("form");

    if(formDiv){

      formDiv.innerHTML = "";

      finishedMatches
        .slice(0,5)
        .forEach(match => {

          const isLiverpoolHome =
            match.homeTeam.name === "Liverpool FC";

          const homeGoals =
            match.score.fullTime.home;

          const awayGoals =
            match.score.fullTime.away;

          let form = "D";
          let formClass = "form-draw";

          if (
            (isLiverpoolHome && homeGoals > awayGoals) ||
            (!isLiverpoolHome && awayGoals > homeGoals)
          ) {
            form = "W";
            formClass = "form-win";
          }

          if (
            (isLiverpoolHome && homeGoals < awayGoals) ||
            (!isLiverpoolHome && awayGoals < homeGoals)
          ) {
            form = "L";
            formClass = "form-loss";
          }

          formDiv.innerHTML += `

            <div class="
              form-circle
              ${formClass}
            ">

              ${form}

            </div>

          `;

        });

    }

    // ===================================
    // NEWS
    // ===================================

    const newsDiv =
      document.getElementById("news");

    newsDiv.innerHTML =
      `<div class="news-grid"></div>`;

    const newsGrid =
      document.querySelector(
        ".news-grid"
      );

    if (newsData.articles) {

      newsData.articles
        .slice(0,6)
        .forEach(article => {

          newsGrid.innerHTML += `

            <div class="news-card">

              ${
                article.image
                  ? `
                    <img
                      src="${article.image}"
                      alt="news"
                    >
                  `
                  : ""
              }

              <h3>

                <a
                  href="${article.url}"
                  target="_blank"
                >

                  ${article.title}

                </a>

              </h3>

<p class="news-time">

  ${new Date(
    article.publishedAt
  ).toLocaleString()}

</p>

<p>

  ${article.description || ""}

</p>
            </div>

          `;

        });

    }

  } catch(error) {

    console.error(error);

  }

}

// ===================================
// LOAD DASHBOARD
// ===================================

loadDashboard();

// ===================================
// DROPDOWN
// ===================================

const squadButton =
  document.getElementById(
    "toggle-squad"
  );

const playersDiv =
  document.getElementById(
    "players-container"
  );
  

const dropdownIcon =
  document.getElementById(
    "dropdown-icon"
  );

if(squadButton){

  squadButton.addEventListener(
    "click",
    () => {

      playersDiv.classList.toggle(
        "hidden"
      );

      dropdownIcon.classList.toggle(
        "rotate"
      );

    }
  );

}

// ===================================
// STANDINGS DROPDOWN
// ===================================

const standingsButton =
  document.getElementById(
    "toggle-standings"
  );

const standingsContainer =
  document.getElementById(
    "standings"
  );

const standingsIcon =
  document.getElementById(
    "standings-icon"
  );

if(standingsButton){

  standingsButton.addEventListener(
    "click",
    () => {

      standingsContainer
        .classList
        .toggle("hidden");

      if(

        standingsContainer
          .classList
          .contains("hidden")

      )standingsIcon.classList.toggle(
  "rotate"
);

    }
  );

}