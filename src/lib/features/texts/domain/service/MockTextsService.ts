
import { withErrorHandling } from "../../../../core/errors/errorHandling";
import { Failure, UnknownFailure } from "../../../../core/errors/failures";
import preprocess from "../preprocessing/preprocessing";
import { CompletedInfo, SpeechInfo, TextInfo, TextsService } from "./TextsService";

const mockText = 
        `Lorem *ipsum* d+olor *s+it* amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida in fermentum et sollicitudin ac orci phasellus egestas tellus. Metus vulputate eu scelerisque felis imperdiet proin. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Tortor posuere ac ut consequat semper. Non sodales neque sodales ut etiam sit. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Ac odio tempor orci dapibus ultrices in iaculis nunc sed. Nibh tortor id aliquet lectus proin nibh nisl condimentum. Consectetur purus ut faucibus pulvinar elementum. Gravida cum sociis natoque penatibus et magnis dis parturient. Vitae et leo duis ut diam quam nulla. Morbi enim nunc faucibus a pellentesque sit amet porttitor eget. Quis auctor elit sed vulputate mi sit amet mauris. Malesuada bibendum arcu vitae elementum curabitur vitae nunc sed. Purus in massa tempor nec feugiat nisl pretium fusce. Sed sed risus pretium quam vulputate dignissim suspendisse. Erat velit scelerisque in dictum non consectetur a erat nam.
                Donec ac odio tempor orci dapibus ultrices in iaculis nunc. A iaculis at erat pellentesque adipiscing. Tincidunt nunc pulvinar sapien et. Massa ultricies mi quis hendrerit dolor magna eget est. Semper feugiat nibh sed pulvinar proin. A diam maecenas sed enim. Diam vel quam elementum pulvinar etiam non quam. At in tellus integer feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. In arcu cursus euismod quis viverra. Sodales neque sodales ut etiam sit amet nisl purus in. Netus et malesuada fames ac turpis egestas sed tempus. Ipsum dolor sit amet consectetur adipiscing. Aliquam faucibus purus in massa. Turpis in eu mi bibendum neque egestas congue quisque egestas. Nunc lobortis mattis aliquam faucibus purus in. Enim blandit volutpat maecenas volutpat blandit aliquam etiam. Eu mi bibendum neque egestas. Augue interdum velit euismod in pellentesque massa. Id velit ut tortor pretium viverra suspendisse potenti nullam ac.
                Ut venenatis tellus in metus vulputate eu scelerisque felis. Arcu non sodales neque sodales ut etiam sit. Maecenas ultricies mi eget mauris. At augue eget arcu dictum varius. Dui id ornare arcu odio ut sem. In cursus turpis massa tincidunt dui ut. Nisi scelerisque eu ultrices vitae. Faucibus et molestie ac feugiat sed lectus. Turpis egestas sed tempus urna. Sit amet nulla facilisi morbi tempus iaculis urna. Morbi tristique senectus et netus et malesuada fames. Suscipit tellus mauris a diam maecenas sed enim ut. Arcu felis bibendum ut tristique. Augue neque gravida in fermentum et. Etiam tempor orci eu lobortis elementum nibh. Nam aliquam sem et tortor. Aliquet porttitor lacus luctus accumsan tortor posuere ac. Nullam eget felis eget nunc. Felis donec et odio pellentesque diam.`;
const mockNotes = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae justo eget magna fermentum iaculis. Dictumst quisque sagittis purus sit amet volutpat consequat. Non quam lacus suspendisse faucibus interdum posuere. Orci sagittis eu volutpat odio facilisis mauris. Ullamcorper a lacus vestibulum sed arcu non. Vulputate enim nulla aliquet porttitor lacus. Quis imperdiet massa tincidunt nunc pulvinar. Aliquam vestibulum morbi blandit cursus risus at. Amet massa vitae tortor condimentum lacinia. Nullam vehicula ipsum a arcu cursus. Orci a scelerisque purus semper eget duis at tellus. Tristique senectus et netus et malesuada fames ac turpis egestas.";

export const mockTexts: TextInfo[] = [
    {
        id: "1",
        text: mockText, 
        note: mockNotes, 
        completed: {
            url: "blablabla/asdf.mp3", 
            is_video: false,
        }, 
        minDuration: 1, 
        maxDuration: 35, 
    },
    {
        id: "2",
        text: mockText.substring(0,30) + mockText, 
        note: mockNotes,
        minDuration: 5, 
        maxDuration: 400, 
    },
    {
        id: "3",
        text: mockText + mockText.substring(80), 
        note: mockNotes,
        completed: {
            url: "http://test.com/test.mp3", 
            is_video: true, 
        }, 
        minDuration: 0, 
        maxDuration: 10, 
    },
];


export class MockTextsService implements TextsService {
    async getTexts() : Promise<TextInfo[] | Failure> {
        // return new UnknownFailure("A test message");
        return withErrorHandling(async () => {
            await new Promise(resolve =>  setTimeout(() => resolve(null), 1000)); 
            return mockTexts.map((text) => {
                return {
                    ...text,
                    text: preprocess(text.text),
                };
            });
        });
    }
    async skipText(id: string, retries: number): Promise<void | Failure> {
        // return new UnknownFailure("A test message");
        return withErrorHandling(() => new Promise(resolve =>  setTimeout(() => resolve(), 300))); 
    } 
    async sendSpeech(speech: SpeechInfo): Promise<Failure | CompletedInfo> {
        return withErrorHandling(() => new Promise(resolve =>  setTimeout(() => resolve({url: 'test', is_video: false}), 3000))); 
    }
}