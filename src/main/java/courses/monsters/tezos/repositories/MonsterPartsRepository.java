package courses.monsters.tezos.repositories;
import courses.monsters.tezos.entities.MonsterPart;
import courses.monsters.tezos.entities.StoryPage;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

@Repository
public interface MonsterPartsRepository extends ReactiveMongoRepository<StoryPage, String> {
    @Query("{ 'body': ?0, 'part': ?1, id: ?2}")
    Mono<MonsterPart> findByBodyAndPartAndId(int body, String part, int id);

}
