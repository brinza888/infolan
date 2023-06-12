var resources = [
    ["Instagram", "instagram.com"],
    ["Facebook", "facebook.com"],
    ["Twitter", "twitter.com"],
    ["TikTok", "tiktok.com"],
    ["YouTube", "youtube.com"],
]

window.addEventListener("DOMContentLoaded", (event) => load());

async function load() {
    if (window.navigator.onLine) {
        document.getElementById("onlineStatus").innerHTML = "&#9989 (online)";
    }
    else {
        document.getElementById("onlineStatus").innerHTML = "&#10060 (offline)";
    }

    var tbodyRef = document.getElementById('resourcesStatus').getElementsByTagName('tbody')[0];
    for (res of resources) {
        var resName = res[0];
        var resDomain = res[1];

        var status = false;

        try {
            var response = await fetch(`https://dns.google/resolve?name=${res[1]}`);
            var json = await response.json();
            if (json["Status"] == 0) {
                status = true;
            }
        }
        catch (e) {
        }

        var statusText = "\u274C (N/A)";
        var resolvedIP = "N/A";
        
        if (status) {
            statusText = "\u2705 (OK)";
            resolvedIP = json["Answer"][0]["data"];
        }

        var newRow = tbodyRef.insertRow();
        newRow.insertCell().appendChild(document.createTextNode(resName));
        newRow.insertCell().appendChild(document.createTextNode(statusText));
        var rdCell = newRow.insertCell();
        rdCell.appendChild(document.createTextNode(resDomain));
        rdCell.classList.add("d-none");
        rdCell.classList.add("d-sm-table-cell");
        var rIPCell = newRow.insertCell();
        rIPCell.appendChild(document.createTextNode(resolvedIP));
        rIPCell.classList.add("d-none");
        rIPCell.classList.add("d-sm-table-cell");
    }
}
