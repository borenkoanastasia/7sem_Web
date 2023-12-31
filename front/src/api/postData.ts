import axios from 'axios';
import { Entity } from 'src/models/dataModels';
import { MyError } from 'src/models/commonModels';
import { Ref } from 'vue';
import { api_config } from './details/constants';
import { catch_error } from './details/helpers';

async function postDataById(
  data_name: string,

  answer: Entity,
  error: Ref<MyError>,

  callback?: () => void,
  errorCallback?: () => void
) {
  await axios
    .post<Entity>(`${api_config.default_url}/${data_name}`, answer, {
      headers: api_config.headers,
    })
    .then((response) => {
      if (callback) callback();
    })
    .catch((reason) => {
      catch_error(reason, error, errorCallback);
    });
}

export { postDataById };
