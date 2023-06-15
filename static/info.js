var resources = [
    ["Instagram", "instagram.com"],
    ["Facebook", "facebook.com"],
    ["Twitter", "twitter.com"],
    ["TikTok", "tiktok.com"],
    ["YouTube", "youtube.com"],
]

async function dnsCheck(domain) {
    var status = false;
    try {
        var response = await fetch(`https://dns.google/resolve?name=${res[1]}`);
        var json = await response.json();
        if (json["Status"] === 0) {
            return json["Answer"][0]["data"];
        } else {
            return undefined;
        }
    } catch (e) {
        return undefined;
    }
}

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

        var dnsStatus = "\u274C (N/A)";
        var resolvedIP = await dnsCheck(resDomain);
        if (resolvedIP !== undefined) {
            dnsStatus = "\u2705 (OK)";
        } else {
            resolvedIP = "N/A";
        }

        var row = tbodyRef.insertRow();
        row.insertCell().appendChild(document.createTextNode(resName));
        row.insertCell().appendChild(document.createTextNode(dnsStatus));
        var domainCell = row.insertCell();
        domainCell.appendChild(document.createTextNode(resDomain));
        domainCell.classList.add("d-none", "d-sm-table-cell");
        var IPCell = row.insertCell();
        IPCell.appendChild(document.createTextNode(resolvedIP));
        IPCell.classList.add("d-none", "d-sm-table-cell");
    }
}
