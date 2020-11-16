import {forces} from 'systems/common/forces.js';
import {inputsPingServer} from 'systems/specific/inputsPingServer.js';
import {collides} from 'systems/specific/collides.js';
import {collidesBall} from 'systems/specific/collidesBall.js';
import {collidesPing} from 'systems/specific/collidesPing.js';

function update() {

    this.world.system(['forces','position'], forces);
    this.world.system(['input'], inputsPingServer);
    this.world.system(['hitbox','position'], collides);
    this.world.system(['hitbox','position','sphere'], collidesBall);
    this.world.system(['hitbox','position','ping'], collidesPing);

    let entitiesModif=[]
    Object.entries(this.world.entities).forEach(([name, entity]) => {
        let positionComponent=entity.get('position');
        let forcesComponent=entity.get('forces');
        entitiesModif.push({'name':name,'components':[positionComponent,forcesComponent]})
    });

    if(entitiesModif.length!=0){
        this.room.io.to(this.room.room).emit('updateEntities',{'entities':entitiesModif});
    }
    //emit
    this.player1.inputs = [];
    this.player2.inputs = [];
}

export {update};
