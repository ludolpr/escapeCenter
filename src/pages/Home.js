import React from "react";
import escapeRoom from "../../src/images/escapeRoom.png";
import BasicMap from "../components/BasicMap";

const Home = () => {
  return (
    <div className="maintContent">
      <h1 className="title">Escape Center</h1>
      <div className="firstContainer">
        <div className="leftContainer">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            magni necessitatibus iusto alias aut optio eos perferendis? Harum
            possimus modi, vero natus obcaecati, veniam doloribus nihil ipsa
            exercitationem quos tempora accusamus quis doloremque! Praesentium
            nam nisi, in, explicabo ullam iure magnam dolore cumque consequuntur
            dolorum animi aperiam incidunt ab mollitia unde porro laudantium
            exercitationem accusantium hic voluptates vel? Aspernatur, non nisi
            accusantium temporibus exercitationem nihil, possimus ullam amet
            eaque debitis cum? Provident possimus quo excepturi voluptatibus.
            Dolorum deleniti vel dolorem accusamus culpa nostrum! Voluptates
            accusantium, natus ab deleniti ad eaque, ipsum minus similique
            laboriosam adipisci cupiditate eligendi sit sunt ducimus enim! Non
            aliquid laboriosam veniam repellendus necessitatibus nobis quos
            ducimus id excepturi illum, odio quibusdam laborum! Sapiente,
            laboriosam earum natus fuga consectetur, fugit soluta magni
            reiciendis velit maiores deserunt autem omnis voluptatum id
            temporibus maxime quisquam voluptate repellat odio recusandae. Illo
            aliquid labore neque nostrum suscipit numquam aliquam iure
            reiciendis.
          </p>
        </div>
        <div className="rightContrainer">
          <img src={escapeRoom} alt="escape game" />
        </div>
      </div>
      <div className="secondContainer">
        <div className="topContainer">
          <BasicMap />
        </div>
        <div className="botContainer">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est fuga
            quaerat repudiandae voluptatem excepturi tempora vel tempore culpa
            quia eveniet aliquam expedita pariatur commodi illum quisquam
            officiis a vitae libero ex, necessitatibus accusamus! Sapiente,
            cupiditate molestiae molestias fuga, voluptatem minus labore
            perspiciatis ducimus libero similique explicabo ipsum soluta totam.
            Ullam ea tempora et libero quam recusandae omnis veritatis. Fuga
            officiis fugit sapiente cupiditate, quibusdam quam molestias eos cum
            nam nisi et fugiat eum distinctio sunt laborum impedit, maxime
            dolores? Distinctio rerum ipsa odit at vitae numquam dolorem maxime
            repellat assumenda unde dolorum voluptatibus modi et non, natus
            aperiam fugit mollitia animi. Excepturi dicta dolore molestias
            doloribus, iusto labore. Corporis autem, ducimus, vero ipsam alias
            amet totam ipsum et dolorum magni quam, recusandae odio pariatur
            distinctio. Laboriosam, adipisci, quos similique ratione ad placeat
            ullam ipsa fugiat totam, numquam sunt magnam distinctio ea. Nesciunt
            culpa doloremque neque natus dolorem ullam consequatur earum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
