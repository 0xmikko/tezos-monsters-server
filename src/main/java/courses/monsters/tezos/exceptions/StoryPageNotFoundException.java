package courses.monsters.tezos.exceptions;

public class StoryPageNotFoundException extends RuntimeException {
    public StoryPageNotFoundException(String tweetId) {
        super("Story page not found with id " + tweetId);
    }

}
