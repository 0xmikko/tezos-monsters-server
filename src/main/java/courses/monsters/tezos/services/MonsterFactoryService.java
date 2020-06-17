package courses.monsters.tezos.services;

import courses.monsters.tezos.repositories.MonstersFactoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;

@Service
public class MonsterFactoryService {

    @Autowired
    MonstersFactoryRepository monstersFactoryRepository;

    private int maxBody;
    private int maxHats;
    private int maxEyes;
    private int maxNoses;
    private int maxMouth;




    @PostConstruct
    public void init() {

    }

    public byte[] getImage(int id, int hat_id, int eyes_id, int nose_id, int mouth_id,
                           int hat_x, int hat_y,
                           int eyes_x, int eyes_y,
                           int nose_x, int nose_y,
                           int mouth_x, int mouth_y) throws IOException {
        File path = new File("./src/main/resources/pictures");
        // base path of the images

// load source images
        BufferedImage body = ImageIO.read(new File(path, "c" + id + ".png"));
        BufferedImage hat = ImageIO.read(new File(path, "h" + hat_id + ".png"));
        BufferedImage eyes = ImageIO.read(new File(path, "e" + eyes_id + ".png"));
        BufferedImage nose = ImageIO.read(new File(path, "n" + nose_id + ".png"));
        BufferedImage mouth = ImageIO.read(new File(path, "m" + mouth_id + ".png"));

// create the new image, canvas size is the max. of both image sizes
        int w = body.getWidth();
        int h = body.getHeight() + 200;
        BufferedImage combined = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);

// paint both images, preserving the alpha channels
        Graphics g = combined.getGraphics();
        g.drawImage(body, 0, 200,  null);
        g.drawImage(hat, hat_x, hat_y, null);
        g.drawImage(eyes, eyes_x, eyes_y, null);
        g.drawImage(nose, nose_x, nose_y, null);
        g.drawImage(mouth, mouth_x, mouth_y, null);

        g.dispose();

// Save as new image
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(combined, "png", baos);
        return baos.toByteArray();
    }

    public String getNextMonster() {
        return "";
    }

}
