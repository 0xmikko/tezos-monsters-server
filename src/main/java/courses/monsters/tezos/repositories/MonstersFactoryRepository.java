package courses.monsters.tezos.repositories;
import courses.monsters.tezos.entities.StoryPage;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MonstersFactoryRepository extends ReactiveMongoRepository<StoryPage, String> {


}
