import java.util.HashSet;
import java.util.Set;

public class MessageConsumer {
    private Set<String> processedMessages = new HashSet<>();

    public void processMessage(String messageId, String messageContent) {
        if (processedMessages.contains(messageId)) {
            System.out.println("Duplicate message ignored: " + messageId);
            return;
        }

        // Process the message here
        System.out.println("Processing message: " + messageContent);

        // Add messageId to processed set
        processedMessages.add(messageId);
    }
}