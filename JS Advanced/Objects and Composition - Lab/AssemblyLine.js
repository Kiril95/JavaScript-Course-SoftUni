function createAssemblyLine() {
    let resultObj = {
        hasClima(obj) {
            obj.temp = 21,
            obj.tempSettings = 21,
            obj.adjustTemp = function() {
                this.temp < this.tempSettings ? (this.temp += 1) : (this.temp -= 1);
            }
        },

        hasAudio: obj => Object.assign(obj, {
            currentTrack: null,
            nowPlaying: function () {
                if (this.currentTrack !== null) {
                    console.log(`Now playing '${this.currentTrack.name} by ${this.currentTrack.artist}`)
                }
            }
        }),

        hasParktronic(obj) {
            obj.checkDistance = function(distance) {
                let message = '';
                if(distance < 0.1) {
                    message = 'Beep! Beep! Beep!';
                } else if(distance < 0.25) {
                    message = 'Beep! Beep!';
                } else if(distance < 0.5) {
                    message = 'Beep!';
                }
                console.log(message);
            }
        }
    };

    return resultObj;
}

const assemblyLine = createAssemblyLine();
const myCar = {
    make: 'Toyota',
    model: 'Avensis'
};

assemblyLine.hasClima(myCar);
console.log(myCar.temp);
myCar.tempSettings = 18;
myCar.adjustTemp();
console.log(myCar.temp);