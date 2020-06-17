package courses.monsters.tezos.services;

import com.mongodb.connection.Stream;
import courses.monsters.tezos.entities.Monster;
import courses.monsters.tezos.entities.MonsterPart;
import courses.monsters.tezos.repositories.MonsterPartsRepository;
import courses.monsters.tezos.repositories.MonstersFactoryRepository;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
@ToString
public class MonsterFactoryService {

    @Autowired
    MonstersFactoryRepository monstersFactoryRepository;

    @Autowired
    MonsterPartsRepository monsterPartsRepository;

    private String[] parts = {"hat", "eyes", "nose", "mouth"};
    private int maxBody;
    private Map<String, Integer> maxItem;

    @Value("classpath:${tezosmonsters.factory.pictures_folder}")
    private String path;


    @PostConstruct
    public void init() {

        maxItem = new HashMap<>();
        maxBody = getMaxImageNumber("body");
        Arrays.stream(parts).forEach(p -> maxItem.put(p, getMaxImageNumber(p)));
        System.out.println(this.toString());
    }

    public byte[] getImage(int body_id, int hat_id, int eyes_id, int nose_id, int mouth_id,
                           int hat_x, int hat_y,
                           int eyes_x, int eyes_y,
                           int nose_x, int nose_y,
                           int mouth_x, int mouth_y) throws IOException {
        return getImage(new Monster(body_id, hat_id, eyes_id, nose_id, mouth_id,
                hat_x, hat_y,
                eyes_x, eyes_y,
                nose_x, nose_y,
                mouth_x, mouth_y));

    }

    public byte[] getImage(Monster monster) throws IOException {

        // base path of the images

        // load source images
        BufferedImage body = ImageIO.read(ResourceUtils.getFile(path + "/body_" + monster.getBody_id() + ".png"));
        // create the new image, canvas size is the max. of both image sizes
        int w = body.getWidth();
        int h = body.getHeight() + 200;
        BufferedImage result = new BufferedImage(w, h, BufferedImage.TYPE_INT_ARGB);
        Graphics g = result.getGraphics();
        g.drawImage(body, 0, 200, null);

        monster.getParts().entrySet().forEach(p -> {
            try {
                var monsterPart = p.getValue();
                BufferedImage partImage = ImageIO.read(ResourceUtils.getFile(path + "/" + p.getKey() + "_" + monsterPart.getId() + ".png"));
                g.drawImage(partImage, monsterPart.getX(), monsterPart.getY(), null);
            } catch (IOException e) {
                System.out.println("Problem with " + p);
            }
        });


        g.dispose();

        // Save as new image
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write(result, "png", baos);
        return baos.toByteArray();
    }

    public String getNextMonster(String code) {
        return "";
    }

    private int getMaxImageNumber(String part) {
        int result = 1;
        try {
            while (true) {
                File file = ResourceUtils.getFile(path + "/" + part + "_" + result + ".png");
                result++;
            }
        } catch (IOException e) {
            return result - 1;
        }
    }


    private MonsterPart getFromString(int body, String part, String code) {

        var id = Integer.parseInt(code.substring(0, 1), 16) % maxItem.get(part);
        var mp = monsterPartsRepository.findByBodyAndPartAndId(body, path, id).block();

        if (mp == null) {
            mp = new MonsterPart(body, part, id);
        }

        mp.setX((int) (mp.getX() * (Integer.parseInt(code.substring(1, 3), 16) / 256.0 - 0.5)));
        mp.setY((int) (mp.getX() * (Integer.parseInt(code.substring(3, 5), 16) / 256.0 - 0.5)));

        return mp;
    }

}
