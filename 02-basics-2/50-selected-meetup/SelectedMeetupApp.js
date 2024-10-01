import { defineComponent, onMounted, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const selectedMeetup = ref(1)
    const meetupInfo = ref()

    function handleSelectPreviousMeetup() {
      selectedMeetup.value--
    }

    function handleSelectNextMeetup() {
      selectedMeetup.value++
    }

    async function getMeetupInfo(id) {
      meetupInfo.value = await getMeetup(id)
    }

    watch(() => selectedMeetup.value, () => {
      getMeetupInfo(selectedMeetup.value)
    })

    onMounted(async () => {
      getMeetupInfo(selectedMeetup.value)
    })

    return {
      selectedMeetup,
      meetupInfo,
      handleSelectPreviousMeetup,
      handleSelectNextMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button 
          class="button button--secondary" 
          type="button" 
          :disabled="selectedMeetup === 1"
          @click="handleSelectPreviousMeetup"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button">
            <input
              v-model="selectedMeetup"
              id="meetup-id-1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="1"
            />
            <label for="meetup-id-1" class="radio-group__label">1</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="selectedMeetup"
              id="meetup-id-2"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="2"
            />
            <label for="meetup-id-2" class="radio-group__label">2</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="selectedMeetup"
              id="meetup-id-3"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="3"
            />
            <label for="meetup-id-3" class="radio-group__label">3</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="selectedMeetup"
              id="meetup-id-4"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="4"
            />
            <label for="meetup-id-4" class="radio-group__label">4</label>
          </div>
          <div class="radio-group__button">
            <input
              v-model="selectedMeetup"
              id="meetup-id-5"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="5"
            />
            <label for="meetup-id-5" class="radio-group__label">5</label>
          </div>
        </div>

        <button 
          class="button button--secondary" 
          type="button"
          :disabled="selectedMeetup === 5"
          @click="handleSelectNextMeetup"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 v-if="meetupInfo?.title" class="meetup-cover__title">{{ meetupInfo.title }}</h1>
        </div>
      </div>

    </div>
  `,
})
