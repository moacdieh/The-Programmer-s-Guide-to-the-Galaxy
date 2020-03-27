class Banner {
    static draw(message, sub_text) {
			pg.push();
			pg.translate(pg.width/2,pg.height/2);
			pg.fill(255);
			pg.textFont(font);
			pg.textSize(100);
			pg.textAlign(CENTER,CENTER);
			pg.text(message,0,-100);
			pg.text(score,0,-200);
			pg.textSize(50);
			pg.text(sub_text,0,0);
			pg.pop();
			image(pg,0,0,windowWidth,windowHeight);

    }
}