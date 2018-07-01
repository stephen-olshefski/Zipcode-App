//Listen for submit
let submit = document.getElementById('zipForm');
submit.addEventListener('submit', getLocationInfo);
//Listen for delete
let del = document.querySelector('body');
del.addEventListener('click', resetForm);
//Get zip value from input
function getLocationInfo(e) {
    const zip = document.getElementById('zip').value;
    //Fetch request
    fetch(`http://api.zippopotam.us/us/${zip}`)
        .then(res => {
            if (res.status !== 200) {
                showIcon('remove');
                document.getElementById('zip').classList.add('is-danger');
                document.getElementById('notify').innerHTML = 'Invalid zipcode';
                document.getElementById('notify').classList.add('is-danger');
                throw Error(res.statusText);
            }
            else {
                showIcon('check');
                document.getElementById('zip').classList.remove('is-danger');
                document.getElementById('zip').classList.add('is-success');
                document.getElementById('notify').innerHTML = 'Valid zipcode';
                document.getElementById('notify').classList.remove('is-danger');
                document.getElementById('notify').classList.add('is-success');
                return res.json();
            }
        })
        .then(data => {
            //Show location info
            let output = '';
            data.places.forEach(place => {
                output += `
                    <article class="message is-primary">
                        <div class="message-header">
                            <p>Location Info</p>
                            <button class="delete"></button>
                        </div>
                        <div class="message-body">
                            <ul>
                                <li><strong>City: </strong>${place['place name']}</li>
                                <li><strong>State: </strong>${place['state']}</li>
                                <li><strong>Lng: </strong>${place['longitude']}</li>
                                <li><strong>Lat: </strong>${place['latitude']}</li>
                            </ul>
                        </div>
                    </article>
                `;
            });
            //Insert into output div
            document.getElementById('output').innerHTML = output;
        })
        .catch(error => console.log(error));
    e.preventDefault();
}
//Show or remove icons
function showIcon(icon) {
    //Clear icons
    document.querySelector('.icon-remove').style.display = 'none';
    document.querySelector('.icon-check').style.display = 'none';
    //Show correct icons
    document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}
//Reset form and remove output
function resetForm(e) {
    if(e.target.className === 'delete') {
        document.querySelector('.message').remove();
        document.querySelector('#zip').value = '';
        document.querySelector('.icon-check').remove();
        document.querySelector('#notify').innerHTML = '';
        document.getElementById('zip').classList.remove('is-success');
    }
}